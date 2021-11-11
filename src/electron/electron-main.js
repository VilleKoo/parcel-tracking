const electron = require('electron');
const path = require('path');
const url = require('url');
const tracking = require('../utils/tracking');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');

try {
  require('electron-reloader')(module);
} catch (_) {}

const { app, ipcMain, net, screen, BrowserWindow } = electron;

ipcMain.handle('app:quit', () => app.quit());

ipcMain.handle('get-events', async (event, arg, lang) => {
  const data = await tracking.getTrackingData(arg, lang);
  return data;
});

let mainWindow;

function createWindow(isOnline) {
  const display = screen.getPrimaryDisplay();
  const width = display.bounds.width;
  const height = display.bounds.height;
  const browserWidth = 1024;
  const browserHeight = 768;

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
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => (mainWindow = null));
  /* installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err)); */
}

app.whenReady().then(() => {
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
