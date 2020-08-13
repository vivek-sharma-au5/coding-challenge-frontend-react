import React, { Component } from "react";
import "./App.css";
import { bindActionCreators } from "redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Index from "./Components/index_page";
import Results from "./Components/results";

class App extends Component {
  render() {
    console.log("in app component", this.props.results);
    return (
      <BrowserRouter>
        <div className='wrapper'>
          {/* <Navbar /> */}
          <Index />

          <br />
          <Results />
          <Route path='/' exact strict>
            <Redirect to='/index' />
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("stateInApp", state.movies);
  return {};
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(getDataFromRedux, giveActionsToRedux)(App);
