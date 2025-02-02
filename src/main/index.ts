import { app, BrowserWindow, protocol, session, ipcMain } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow | null;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Keep this off for security
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

  // ...existing code...
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {hash: ''});
  mainWindow.on("closed", () => (mainWindow = null));

}

app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
