import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { useStateValue } from "./components/Context/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              <Chat />
            </Route>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
