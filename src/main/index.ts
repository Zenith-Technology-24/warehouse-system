import { app, BrowserWindow } from "electron";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      sandbox: false,
      webSecurity: true,
      nodeIntegration: true,
      contextIsolation: true,
      allowRunningInsecureContent: false, // Ensure HTTPS content is properly handled
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
  mainWindow.loadURL("http://localhost:5173");
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
