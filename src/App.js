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
  const [username, setUsername] = useState("");

  const calcTime = () => {
    let currTime = new Date().getTime();
    console.log(currTime - loginTime < 3600);
    return currTime - loginTime < 3600;
  };

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
        username,
        setUsername,
      }}
    >
      {isLoggedIn ? (
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
