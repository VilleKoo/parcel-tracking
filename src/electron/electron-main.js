const electron = require('electron');
const { ipcMain } = require('electron');
const tracking = require('../utils/tracking')

try {
  require('electron-reloader')(module)
} catch (_) { }

ipcMain.handle('get-events', async (event, arg) => {
    const data = await tracking.getTrackingData(arg);
    return data;
})

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Parcel Tracking',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
   }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '../../build/index.html'),
      protocol: 'file:',
      slashes: true
  });
  mainWindow.removeMenu();
  mainWindow.loadURL(startUrl);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
      app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
      createWindow()
  }
});