/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["outerLayoutClass", "innerLayoutClass"],
};

export default config;
