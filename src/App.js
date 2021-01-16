import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { PublicRouter, PrivateRouter } from "./utils/Router";
import { AppProvider } from "../src/context";
import { useState } from "react";
function App() {
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("account")
  );
  return (
    <AppProvider value={{ setCurrentAccount }}>
      {currentAccount ? (
        <div>
          <PrivateRouter />
        </div>
      ) : (
        <div>
          <PublicRouter />
        </div>
      )}
    </AppProvider>
  );
}

export default App;
