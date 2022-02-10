import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

const NavBar = (props) => {
  const dispatch = useDispatch();

  const setLoggedIn = (value) => {
    dispatch({
      type: "SET_LOGGED_IN",
      loggedIn: value,
    });
  };

  const isRegistered = (value) => {
    dispatch({
      type: "IS_REGISTERED",
      isRegistered: value,
    });
  };
  return (
    <div className="header">
    {/* Here we check is the user has logged in. If they have we will change the NavLink to Log out */}
      {props.loggedIn ? (
        <NavLink
          onClick={() => {
            setLoggedIn(false);
            isRegistered(false);
            dispatch({
              type: "CHANGE_STUDENT",
              name: "Select",
            });
          }}
          to="/"
        >
          Log out
        </NavLink>
      ) : (
        <NavLink exact to="/">
          Login
        </NavLink>
      )}
      {/*If the user is not logged in then we will show the Register NavLink*/}
      {!props.loggedIn ? <NavLink to="/register">Register</NavLink> : null}
      {/*Here we check if the user is logged in and is a admin in order to see the 
      Dashboard and Add Topic NavLinks*/}
      {props.loggedIn && props.isAdmin ? (
        <NavLink to="/dashboard">Dashboard</NavLink>
      ) : null}
      {props.loggedIn && props.isAdmin ? (
        <NavLink to="/topics">Add Topic</NavLink>
      ) : null}
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

export default connect(mapStateToProps)(NavBar);
