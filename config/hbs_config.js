import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (hbs, path) => {
  // partials
  hbs.registerPartials(path.resolve(__dirname, "../views/partials"));
  // helpers
  hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
  });
};
