import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import About from './components/About'
import ProductListing from './components/ProductListing'
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact component={ProductListing}/>
        <Route path="/about" component={About}/>
        <Route path="/product/:id" component={ProductDetail}/>
      </Switch>
    </Router>
  );
}

export default App;
