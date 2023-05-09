import { RouterProvider } from "react-router-dom";

import { routes } from "./routes/routes";
import "./assets/styles/common.css";
import { TransactionProvider } from "./providers/transaction_provider";

export default function App() {
  return (
    <TransactionProvider>
      <RouterProvider router={routes}></RouterProvider>
    </TransactionProvider>
  );
}
