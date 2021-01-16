import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { PublicRouter, PrivateRouter } from "./utils/Router";

function App() {
  return (
    <div>
      {localStorage.getItem("account") ? (
        <div>
          <PrivateRouter />
        </div>
      ) : (
        <div>
          <PublicRouter />
        </div>
      )}
    </div>
  );
}

export default App;
