import glsl from "vite-plugin-glsl";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isCI = !!process.env.GITHUB_ACTIONS;

export default {
  plugins: [glsl()],
  base: isCI && repo ? `/${repo}/` : "/",
};
