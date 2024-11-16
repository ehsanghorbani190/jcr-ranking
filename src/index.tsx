import { render } from "preact";
import { Provider } from "@/components/ui/provider";
import App from "./App";

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("app")
);
