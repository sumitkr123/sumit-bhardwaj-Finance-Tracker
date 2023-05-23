import { RouterProvider } from "react-router-dom";

import "./assets/styles/common.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";
import { routes } from "./routes/routing";

export default function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </CookiesProvider>
  );
}
