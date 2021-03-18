import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./components/Context/StateProvider";
import reducer, { initialState } from "./components/Context/reducer";

ReactDOM.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Route component={App} />
    </StateProvider>
  </Router>,
  document.getElementById("root")
);
