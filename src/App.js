import ImageRepoNavbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Router from "./utils/Router";

function App() {
  return (
    <div>
      <ImageRepoNavbar />
      <Router />
    </div>
  );
}

export default App;
