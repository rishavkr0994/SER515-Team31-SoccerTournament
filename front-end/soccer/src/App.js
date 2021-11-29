import React, { useEffect } from "react";
import NavMenu from "./components/NavMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Map from "./components/Map";
import Footer from "./components/Footer";
import Tournaments from "./components/Tournaments";
import Top from "./components/Top";
import ATournament from "./components/ATournament";
import AllTournament from "./components/AllTournament";
import CreateTournament from "./components/CreateTournament";
import NewMap from "./components/NewMap";

function App() {
  useEffect(() => {
    document.title = "ASU Soccer";
  });

  return (
    <div className="App Bg">
      <Router>
        <Top></Top>
        <NavMenu />
        <Switch>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/tournament/getAll">
            <AllTournament></AllTournament>
          </Route>
          <Route path="/tournament/get/:name">
            <ATournament></ATournament>
          </Route>
          <Route path="/tournament/create">
            <CreateTournament></CreateTournament>
          </Route>
          <Route path="/map">
            <NewMap></NewMap>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
