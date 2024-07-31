import { useState, useReducer } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function reducer(state, { type, payload }) {
  switch (type) {
    case "CHANGE_EMAIL":
      return {
        ...state,
        ...payload
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        ...payload
      };
    default:
      throw new Error("Invalid action type");
  }
}

const initState = {
  email: "",
  password: ""
};

function Login() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [alert, setAlert] = useState("");

  const { login } = useContext(AuthContext);

  async function handleSubmit() {
    try {
      const res = await fetch(`https://reqres.in/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });
      const userAuthDetails = await res.json();

      if (userAuthDetails) {
        const token = userAuthDetails.token;
        login(token);
        setAlert(<h4>Login Successful...</h4>);
        dispatch({ type: "CHANGE_EMAIL", payload: { email: "" } });
        dispatch({ type: "CHANGE_PASSWORD", payload: { password: "" } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { email, password } = state;

  function handleEmail(e) {
    dispatch({
      type: "CHANGE_EMAIL",
      payload: {
        [e.target.id]: e.target.value
      }
    });
  }

  function handlePassword(e) {
    dispatch({
      type: "CHANGE_PASSWORD",
      payload: {
        [e.target.id]: e.target.value
      }
    });
  }

  return (
    <div class="loginEmail">
      <label class="labelEmail">
        <h3>Email : </h3>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />
      </label>
      <br />
      <label class="labelPassword">
        <h3>Password : </h3>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <button onClick={handleSubmit}>Login/Signup</button>
      {alert && <div>{alert}</div>}
    </div>
  );
}

export default Login;
