import { app, BrowserWindow } from "electron";
import * as path from "path";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      // Keep this off for security
      contextIsolation: true
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
  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"), { hash: "" });
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
