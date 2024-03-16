import React from "react";
import ReactDOM from "react-dom/client";
import rootReducer from "./reducers/index";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

//configure store
const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      <Toaster />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
