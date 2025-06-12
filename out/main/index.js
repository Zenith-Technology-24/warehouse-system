import { app, BrowserWindow } from "electron";
import * as path from "path";
import { is } from "@electron-toolkit/utils";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
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
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    const indexPath = path.join(__dirname, "../renderer/index.html");
    mainWindow.loadFile(indexPath);
  }
  mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(async () => {
  createWindow();
});
app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
