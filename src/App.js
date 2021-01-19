import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { PublicRouter, PrivateRouter } from "./utils/Router";
import { AppProvider } from "../src/context";
import { useState } from "react";
function App() {
  const [loginTime, setLoginTime] = useState(new Date().getTime());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [allUploadedImages, setAllUploadedImages] = useState([]);

  return (
    <AppProvider
      value={{
        imagesUploaded,
        setImagesUploaded,
        allUploadedImages,
        setAllUploadedImages,
        isLoggedIn,
        setIsLoggedIn,
        setLoginTime,
      }}
    >
      {new Date().getTime() - loginTime < 3600 && isLoggedIn ? (
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
