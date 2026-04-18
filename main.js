const { app, BrowserWindow, ipcMain, screen, session } = require("electron");
const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");

let mainWindow;

function createWindow() {
    const { width } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 380,
        height: 520,
        x: width - 400,
        y: 40,
        alwaysOnTop: true,
        resizable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // ── Grant mic permission automatically ──────────────────────────────
    // SpeechRecognition silently fails in Electron without this
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === "media") {
            callback(true); // allow mic
        } else {
            callback(false);
        }
    });

    mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });

// ── Screenshot handler ──────────────────────────────────────────────
ipcMain.handle("take-screenshot", async () => {
    const tmpPath = path.join(os.tmpdir(), `techhelper-${Date.now()}.png`);

    try {
        mainWindow.hide();
        await new Promise(r => setTimeout(r, 300));

        if (process.platform === "darwin") {
            execSync(`screencapture -x "${tmpPath}"`);
        } else if (process.platform === "win32") {
            execSync(
                `powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::PrimaryScreen | ForEach-Object { $bmp = New-Object System.Drawing.Bitmap($_.Bounds.Width, $_.Bounds.Height); $g = [System.Drawing.Graphics]::FromImage($bmp); $g.CopyFromScreen($_.Bounds.Location, [System.Drawing.Point]::Empty, $_.Bounds.Size); $bmp.Save('${tmpPath}') }"`
            );
        } else {
            execSync(`scrot "${tmpPath}"`);
        }

        mainWindow.show();

        const imgBuffer = fs.readFileSync(tmpPath);
        const base64 = imgBuffer.toString("base64");
        fs.unlinkSync(tmpPath);

        return { success: true, base64, mimeType: "image/png" };
    } catch (err) {
        mainWindow.show();
        return { success: false, error: err.message };
    }
});

// ── Window controls ─────────────────────────────────────────────────
ipcMain.on("close-app", () => app.quit());
ipcMain.on("minimize-app", () => mainWindow.minimize());