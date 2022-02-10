import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState();
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleRegistration = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/user/register", {
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
      .then((response) => setUserCreated(response))
      .catch((err) => console.log(err)
        // setError("Username and password must be at least 6 characters long")
      );
  };

  useEffect(() => {
    //If user has been created then store value in redux store and navigate to root page 
    if (userCreated) {
      const isRegistered = (value) => {
        dispatch({
          type: "IS_REGISTERED",
          isRegistered: value,
        });
      };
      isRegistered(true);
      navigate("/");
    }
    if (error) {
      setError("Username and password must be at least 5 characters long");
    }
  }, [userCreated, error, navigate, dispatch]);

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <label>Username: </label>
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password: </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Register</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    isRegistered: state.isRegistered,
    isAdmin: state.isAdmin,
  };
};
export default connect(mapStateToProps)(Register);
