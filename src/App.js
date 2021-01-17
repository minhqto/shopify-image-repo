import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { PublicRouter, PrivateRouter } from "./utils/Router";
import { AppProvider } from "../src/context";
import { useState } from "react";
function App() {
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem("account")
  );
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [allUploadedImages, setAllUploadedImages] = useState([]);
  return (
    <AppProvider
      value={{
        setCurrentAccount,
        imagesUploaded,
        setImagesUploaded,
        allUploadedImages,
        setAllUploadedImages,
      }}
    >
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
