// import logo from './logo.svg';
// import './App.css';
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/", "/auth"]} exact component={Auth} />
        <Route path="/home" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
        <Route component={NotFound} /> {/* 404 */}
      </Switch>
    </Router>
  );
}

export default App;
