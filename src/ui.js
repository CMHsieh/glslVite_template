import GUI from "lil-gui";
export function setupGUI(state) {
  const gui = new GUI();
  gui.add(state, "scale", 0.1, 5.0, 0.01).name("u_scale");
  gui.add(state, "speed", 0.0, 3.0, 0.01).name("u_speed");
  gui.add(state, "followMouse").name("u_followMouse");
}
