import React from "react";
import "./sass/pages/app.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import firebaseConfig from "./components/config";
import Comments from "./pages/Comments";
function App() {
  return (
    <div>
      <Router>
        <Redirect push to="/" />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/coms" component={Comments} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
