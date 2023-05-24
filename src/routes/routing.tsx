import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "../components/errorpage";
import { Protected } from "../protected";
import { routeList, TypeRoutes } from "./routes";

const routeMapper = (item: TypeRoutes) => {
  return (
    <Route key={item.path} path={item.path}>
      {Array.isArray(item.element) &&
        item.element.map((newItem: TypeRoutes) => {
          switch (Array.isArray(newItem.element)) {
            case true:
              return routeMapper(newItem);

            default:
              return (
                <Route
                  key={newItem.path}
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
                      {newItem.path !== "/*" &&
                      !Array.isArray(newItem.element) ? (
                        <Protected
                          isProtectedRoute={
                            newItem.protected !== undefined && newItem.protected
                          }
                          component={newItem.element}
                        />
                      ) : (
                        !Array.isArray(newItem.element) && newItem.element
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
