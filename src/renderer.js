// 編譯 shader
function compile(gl, src, type) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);

  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) || "shader compile error";
    console.error("[GLSL compile error]", log, "\n--- source ---\n" + src);
    throw new Error(log);
  }
  return sh;
}

// 初始化 WebGL、建立 shader program 與 buffer
export function createGL(canvas, vertSrc, fragSrc) {
  const gl = canvas.getContext("webgl");
  if (!gl) throw new Error("WebGL not supported");

  // 編譯 vertex 與 fragment shader
  const vs = compile(gl, vertSrc, gl.VERTEX_SHADER);
  const fs = compile(gl, fragSrc, gl.FRAGMENT_SHADER);

  // 建立並連結 shader program
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) || "program link error";
    console.error("[Program link error]", log);
    throw new Error(log);
  }
  gl.useProgram(program);

  // 建立全螢幕 quad buffer
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([ -1,-1,  1,-1, -1, 1,   1,-1, 1, 1, -1, 1 ]),
    gl.STATIC_DRAW
  );

  // 取得 attribute 位置並啟用
  const a_pos = gl.getAttribLocation(program, "a_pos");
  if (a_pos === -1) {
    console.warn("[Warn] attribute a_pos not found (optimized out?)");
  }
  gl.enableVertexAttribArray(a_pos);
  gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

  // 取得 uniform 位置
  const get = (n) => gl.getUniformLocation(program, n);
  const handles = {
    gl,
    u_iResolution: get("iResolution"),
    u_iTime:       get("iTime"),
    u_iMouse:      get("iMouse"),
    u_scale:       get("u_scale"),
    u_speed:       get("u_speed"),
    u_followMouse: get("u_followMouse")
  };
  console.log("[Uniform locations]", handles);
  return handles;
}

// 每幀更新 uniform 並繪製
export function renderLoop(h, state) {
  const gl = h.gl;
  function loop(tms) {
    // 設定 canvas 尺寸與 viewport
    const w = gl.canvas.width  = gl.canvas.clientWidth || 1;
    const hgt = gl.canvas.height = gl.canvas.clientHeight || 1;

    gl.viewport(0, 0, w, hgt);

    // 傳 uniform 參數給 shader
    if (h.u_iResolution) gl.uniform2f(h.u_iResolution, w, hgt);
    if (h.u_iTime)       gl.uniform1f(h.u_iTime, (tms - state.start) / 1000);
    if (h.u_iMouse)      gl.uniform2f(h.u_iMouse, state.mouse[0], state.mouse[1]);
    if (h.u_scale)       gl.uniform1f(h.u_scale, state.scale ?? 1.0);
    if (h.u_speed)       gl.uniform1f(h.u_speed, state.speed ?? 1.0);
    if (h.u_followMouse) gl.uniform1i(h.u_followMouse, state.followMouse ? 1 : 0);

    // 繪製全螢幕三角形
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // 檢查 WebGL 錯誤（可選）
    const err = gl.getError();
    if (err !== gl.NO_ERROR) {
      console.warn("[WebGL error code]", err);
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}