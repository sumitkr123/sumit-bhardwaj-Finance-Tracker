import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "../components/errorpage/errorPage";
import { Protected } from "../protected";
import { routeList, TypeRoutes } from "./routes";

const routeMapper = (item: TypeRoutes): React.JSX.Element => {
  return (
    <Route key={item.path} path={item.path}>
      {item.further?.map((newItem: TypeRoutes) => {
        switch (newItem.further !== undefined) {
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
                        errorSubTitle={error.message.toString()}
                        redirect={"/"}
                      />
                    )}
                  >
                    {newItem.path !== "/*" &&
                    newItem.protected !== undefined &&
                    newItem.element ? (
                      <Protected
                        isProtectedRoute={newItem.protected}
                        component={newItem.element}
                      />
                    ) : (
                      newItem.element && newItem.element
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
