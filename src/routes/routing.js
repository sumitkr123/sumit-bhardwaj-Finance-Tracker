import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "../components/errorpage";
import { Protected } from "../protected";
import { routeList } from "./routes";

const routeMapper = (item) => {
  if (Array.isArray(item.element)) {
    return (
      <Route key={item} path={item.path}>
        {item.element.map((newItem) => {
          if (Array.isArray(newItem.element)) {
            return routeMapper(newItem);
          } else {
            return (
              <Route
                key={newItem}
                path={newItem.path}
                element={
                  <ErrorBoundary
                    FallbackComponent={({ error, resetErrorBoundary }) => (
                      <ErrorPage
                        error={error}
                        resetErrorBoundary={resetErrorBoundary}
                        errorTitle={"Oops...! There are some issues..!"}
                        errorSubTitle={error.message}
                        redirect={"/"}
                      />
                    )}
                  >
                    {newItem.path !== "/*" ? (
                      <Protected
                        protected={newItem.protected}
                        component={newItem.element}
                      />
                    ) : (
                      newItem.element
                    )}
                  </ErrorBoundary>
                }
              ></Route>
            );
          }
        })}
      </Route>
    );
  } else {
    return <Route path={item.path} element={item.element}></Route>;
  }
};

const newRoutes = routeMapper(routeList);

export const routes = createBrowserRouter(createRoutesFromElements(newRoutes));
