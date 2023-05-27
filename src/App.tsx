import { RouterProvider } from "react-router-dom";

import "./assets/styles/common.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";
import { routes } from "./routes/routing";
import React from "react";

const App = (): React.JSX.Element => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
