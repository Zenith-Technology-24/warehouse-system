/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { is } from '@electron-toolkit/utils'

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 900,
    webPreferences: {
      nodeIntegration: true, // Keep this off for security
      contextIsolation: true,
    },
  });

  // Add certificate error handler
  mainWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      callback(true);
    }
  );

  // Handle certificate errors
  mainWindow.webContents.session.setCertificateVerifyProc(
    (request, callback) => {
      callback(0); // 0 means success
    }
  );

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // For production, use file:// protocol with proper path resolution
    const indexPath = path.join(__dirname, '../renderer/index.html')
    mainWindow.loadFile(indexPath)
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(async () => {
  createWindow();
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
