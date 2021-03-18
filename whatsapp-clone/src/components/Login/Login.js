import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import css from "./Login.module.css";
import { useStateValue } from "../Context/StateProvider";
import { actionTypes } from "../Context/reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className={css.login}>
      <div className={css.loginContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
