import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "./index.css";
import AppRoutes from "./routes/Routes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    /* Wraqpping with Provider so all components have access to the store */
    <Provider store={store}>
      {/* AppRoutes handles all routing (importing <AppRoutes /> instead of <App /> since otherwise it wouldn't know the base url)*/}
      <AppRoutes />
    </Provider>
);
