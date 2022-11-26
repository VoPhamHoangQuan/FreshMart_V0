import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { Provider } from "react-redux";
import GlobalStyle from "./components/GlobalStyle";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <GlobalStyle>
            <App />
        </GlobalStyle>
        {/* </React.StrictMode> */}
    </Provider>
);
