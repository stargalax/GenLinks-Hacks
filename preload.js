const { contextBridge, ipcRenderer } = require("electron");

// Safely expose only what the renderer needs
contextBridge.exposeInMainWorld("electronAPI", {
    takeScreenshot: () => ipcRenderer.invoke("take-screenshot"),
    closeApp: () => ipcRenderer.send("close-app"),
    minimizeApp: () => ipcRenderer.send("minimize-app"),
});