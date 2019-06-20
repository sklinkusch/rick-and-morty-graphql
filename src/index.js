import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from 'react-router-dom';

{/* USE HashRouter */ }
ReactDOM.render(
  <HashRouter hashType="noslash" basename={process.env.PUBLIC_URL}>
    <App />
  </HashRouter>
  , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
