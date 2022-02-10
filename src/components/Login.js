import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setTimeout(async () => {
      await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((res) => setLoginData(res))
        .catch(() => setError("Incorrect details"));
    }, 200);
  };

  useEffect(() => {
    if (loginData.token) {
      const setLoggedIn = (value) => {
        dispatch({
          type: "SET_LOGGED_IN",
          loggedIn: value,
        });
      };
      setLoggedIn(true);

       const setIsAdmin = (value) => {
        dispatch({
          type: "SET_IS_ADMIN",
          isAdmin: value,
        });
      };
      if (loginData.isAdmin) {
        navigate("/dashboard");
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate("/dashboard");
      }
    }
    if (error) {
      setError("Incorrect details");
    }
  }, [loginData, error, navigate, dispatch]);

  return (
    <div className="App">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <br />
          {error && <div className="error">{error}</div>}
          <button>Login</button>
        </form>
      </div>
      {props.isRegistered && <p>Registration complete, please log in.</p>}
    </div>
  );
};

//We map the states we have in the redux store to props so we can use throughout the app
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    isRegistered: state.isRegistered,
    isAdmin: state.isAdmin
  };
};
export default connect(mapStateToProps)(Login);
