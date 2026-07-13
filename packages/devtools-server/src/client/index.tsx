import { renderDevTools } from "@refinedev/devtools-ui";
import "@refinedev/devtools-ui/style.css";

const container = document.getElementById("root");

if (container) {
  renderDevTools(container);
} else {
  throw new Error("Could not find root element");
}
