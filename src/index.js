import "react-app-polyfill/ie11";
import React from "react";
import ReachDOM from "react-dom";
import App from "./components/App";

ReachDOM.render(<App />, document.querySelector("#root"));
