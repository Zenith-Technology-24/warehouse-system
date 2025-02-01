import { app, BrowserWindow } from "electron";
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      sandbox: false,
      webSecurity: true,
      nodeIntegration: true,
      contextIsolation: true,
      allowRunningInsecureContent: false
      // Ensure HTTPS content is properly handled
    }
  });
  mainWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      callback(true);
    }
  );
  mainWindow.webContents.session.setCertificateVerifyProc(
    (request, callback) => {
      callback(0);
    }
  );
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => mainWindow = null);
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
