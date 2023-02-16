import React, { Suspense } from "react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LangContextProvider from "./store/lang-Context";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const loadingMarkup = (
  <div style={{ padding: 4, textAlign: "center" }}>
    <h2>Loading...</h2>
  </div>
);
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserRouter>
        <LangContextProvider>
          <App />
        </LangContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);

reportWebVitals();
