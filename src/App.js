import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { connect } from "react-redux";
import NotAuthorisedPage from "./components/NotAuthorisedPage";
import AddTopic from "./components/AddTopic";
import NavBar from "./components/NavBar";
import GuestDashboard from "./components/GuestDashboard";

function App(props) {
  //
  const dashboardView = () => {
    if (props.loggedIn){
      if(props.isAdmin){
        //If user is logged in and is a admin show this route
        return <Route path="/dashboard" element={<Dashboard />} />
      } else {
        //If user is logged in and is not a admin show this route
        return <Route path="/dashboard" element={<GuestDashboard />} />
      }
  } else {
    //If user is not logged in show this route 
    return <Route path="/dashboard" element={<NotAuthorisedPage />} />
  }
}

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="content">
          <Routes>
            {!props.loggedIn ? (
              <Route exact path="/" element={<Login />} />
            ) : null}
            {!props.loggedIn ? (
              <Route path="/register" element={<Register />} />
            ) : null}
            {dashboardView()}
            {props.loggedIn ? (
              <Route path="/topics" element={<AddTopic />} />
            ) : (
              <Route path="/topics" element={<NotAuthorisedPage />} />
            )}
            <Route path="/:pagename" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
//We map the states we have in the redux store to props so we can use throughout the app
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    isRegistered: state.isRegistered,
    isAdmin: state.isAdmin,
  };
};
export default connect(mapStateToProps)(App);
