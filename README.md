# GLSL Shader Template

一個最小可用的 **GLSL 練習模板**，使用 [Vite](https://vitejs.dev/) 建立。  
你可以在這裡快速開始寫 shader，並用 GitHub Pages 發佈成果。

---

## 快速開始

### 雲端（免安裝）
1. 點擊右上角 **「Use this template」** 建立你的專案  
2. 開啟 **GitHub Codespaces** 或 **StackBlitz**  
3. 執行 `npm run dev`  
4. 開瀏覽器 `http://localhost:5173` → 就能看到畫面

### 本地端

**前置工作**
1. 安裝 [Git](https://git-scm.com/downloads) －用來管理程式碼、下載專案
2. 安裝 [Node.js 20+](https://nodejs.org/)  －內含 npm ，可安裝前端套件
3. 安裝一個程式碼編輯器（例如 [Visual Studio Code](https://code.visualstudio.com) ）－用來編輯程式碼、管理專案

**Get started**

1. 下載專案並安裝依賴 
   ```bash
   git clone https://github.com/<your-username>/<repo>.git
   cd <repo>
   npm install
   npm run dev
    ```
2. 開瀏覽器 http://localhost:5173

#### 你會看到什麼？

- 一個全螢幕的動態圈紋效果（GLSL fragment shader）
- 畫面會隨著時間動態變化
- 右上角有滑桿，可以調整 u_scale 和 u_speed
- 勾選 u_followMouse 可以用滑鼠移動改變波紋中心點

---

## 專案結構

```bash
src/
├─ main.js        # 進入點：載入 shader 與 renderer
├─ renderer.js    # 建立 WebGL context、傳 uniforms
├─ ui.js          # lil-gui 控制面板
└─ shaders/
   ├─ quad.vert   # 頂點著色器（固定全螢幕 quad，不太需要改）
   └─ main.frag   # 片段著色器（改這個就能玩出不同效果！）
```

---

## 功能

- GLSL Shader 熱更新：修改 .frag 即可立即看到效果
- Uniforms：內建 iResolution、iTime、iMouse
- GUI 控制：用滑桿調整 u_scale、u_speed
- 部署：推到 main 分支會自動建置並發佈到 GitHub Pages

---

## 部署到 GitHub Pages

這個 repo 已經內建 Actions workflow：
1. 把程式推到 main 分支
2. GitHub Actions 會自動執行建置並發佈
3. 你的 demo 會出現在：`https://<your-username>.github.io/<repo>/`

---

## 參考資源

- [The Book of Shaders](https://thebookofshaders.com/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [lil-gui](https://github.com/georgealways/lil-gui)