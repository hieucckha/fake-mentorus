import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "flowbite";
import router from "./router";
import "./styles/tailwind.css";
import "./styles/index.scss";

const rootElement: HTMLElement | null = document.querySelector("#root");
if (rootElement == null) {
	throw new Error("Failed to find root element");
}

ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
