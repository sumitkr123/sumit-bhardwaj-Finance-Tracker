import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AddTransaction } from "./pages/add_transaction";
import { AllData } from "./pages/all_transactions";
import { Transaction } from "./pages/transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTransaction />}></Route>
        <Route path="/:id" element={<AddTransaction />}></Route>
        <Route path="/view" element={<AllData />}></Route>
        <Route path="/view/:id" element={<Transaction />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
