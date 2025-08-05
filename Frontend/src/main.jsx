import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import useLenis from './hooks/useLenis';

// ✅ Create a custom Root component so we can call the hook
function Root() {
  useLenis(); // Enable smooth scroll

  return (
    <React.StrictMode>
<Auth0Provider
  domain="dev-zkna8701yhcn8ufp.us.auth0.com"
  clientId="1Ls6bU40NgRcjWb6ocPXBOmay2yFeG0V"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  cacheLocation="localstorage"   
  useRefreshTokens={true}
>

        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
