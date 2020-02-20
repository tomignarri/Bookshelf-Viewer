import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReachDOM from "react-dom";
import App from "./components/App";

ReachDOM.render(<App />, document.querySelector("#root"));
