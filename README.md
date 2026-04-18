# 🌿 TechHelper Overlay — Electron App

A floating AI-powered desktop helper for senior citizens. It sits on top of all your other windows and helps you understand your screen — step by simple step.
Youtube: https://youtu.be/lEE2a3St2V8
---

## 🚀 Setup (takes about 5 minutes)

### Step 1 — Install Node.js
If you don't have it: https://nodejs.org → download the **LTS** version and install it.

### Step 2 — Clone / download this folder
Put the `electron-app` folder somewhere on your computer.

### Step 3 — Install dependencies
Open a terminal inside the `electron-app` folder and run:
```bash
npm install
```

### Step 4 — Add your Groq API key
Open `index.html` and find this line near the top of the `<script>` tag:
```js
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
```
Replace `YOUR_GROQ_API_KEY_HERE` with your actual Groq key from https://console.groq.com

### Step 5 — Run it!
```bash
npm start
```

A small floating window will appear in the top-right corner of your screen. 🎉

---

## 📸 How screenshots work by platform

| Platform | How it captures |
|---|---|
| **Mac** | Uses built-in `screencapture` command — works out of the box ✅ |
| **Windows** | Uses PowerShell — works on Windows 10+ ✅ |
| **Linux** | Needs `scrot` installed: `sudo apt install scrot` |

---

## 🎬 Features

- **📸 One-tap screenshot** — hides itself, captures your screen, sends to AI
- **✍️ Type a question** — works without a screenshot too
- **🎤 Voice input** — tap the mic and just speak
- **🔊 Auto read-aloud** — reads the steps out loud automatically
- **Always on top** — floats over all your other windows
- **Draggable** — drag the green title bar to move it anywhere

---

## 📁 File structure

```
electron-app/
├── main.js       ← Electron main process (window creation, screenshot)
├── preload.js    ← Secure bridge between Electron and your UI
├── index.html    ← The entire UI (HTML + CSS + JS)
├── package.json  ← Dependencies and build config
└── README.md     ← You're reading this!
```

---

## 🏗️ Build a distributable app (optional)

To create a `.dmg` / `.exe` / `.AppImage` that others can install:

```bash
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

Output will be in the `dist/` folder.

---

## Demo

<img width="477" height="666" alt="image" src="https://github.com/user-attachments/assets/6e3324ba-c336-4f5a-9c95-f10964812b12" />


<img width="1623" height="1079" alt="image" src="https://github.com/user-attachments/assets/7546cf2a-efbb-4e52-87ea-730a28d6cdb2" />
