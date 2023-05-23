import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "../components/errorpage";
import { Protected } from "../protected";
import { routeList, typeRoutes } from "./routes";

const routeMapper = (item: typeRoutes) => {
  return (
    <Route key={item.path} path={item.path}>
      {item.element.map((newItem: any) => {
        switch (Array.isArray(newItem.element)) {
          case true:
            return routeMapper(newItem);

          default:
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
                        isProtectedRoute={newItem.protected}
                        component={newItem.element}
                      />
                    ) : (
                      newItem.element
                    )}
                  </ErrorBoundary>
                }
              />
            );
        }
      })}
    </Route>
  );
};

const newRoutes = routeMapper(routeList);

export const routes = createBrowserRouter(createRoutesFromElements(newRoutes));
