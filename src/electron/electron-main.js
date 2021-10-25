const electron = require('electron');
const { ipcMain } = require('electron');
const tracking = require('../utils/tracking');

try {
  require('electron-reloader')(module);
} catch (_) {}

ipcMain.handle('get-events', async (event, arg) => {
  const data = await tracking.getTrackingData(arg);
  return data;
});

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

ipcMain.handle('app:quit', () => app.quit());

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow(isOnline) {
  const display = electron.screen.getPrimaryDisplay();
  const width = display.bounds.width;
  const height = display.bounds.height;

  const browserWidth = 600;
  const browserHeight = 400;

  mainWindow = new BrowserWindow({
    title: 'Parcel Tracking',
    width: browserWidth,
    height: browserHeight,
    frame: false,
    movable: true,
    x: width - browserWidth,
    y: height - browserHeight,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  ipcMain.handle('app:minimize', () => mainWindow.minimize());

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, isOnline && '../../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.removeMenu();
  mainWindow.loadURL(startUrl);
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  const { net } = require('electron');
  createWindow(net.isOnline());

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(net.isOnline());
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
