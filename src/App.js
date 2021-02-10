import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/products/addProduct";
import axios from "axios"

const App = (props) => {

  const logout = e => {
    e.preventDefault();
    
    // console.log(localStorage.getItem("access_token"))
    const token  = "Bearer " +localStorage.getItem("access_token");
    axios.post("http://127.0.0.1:8000/api/logout", {
        headers: {"Authorization": `Bearer ${token}`}
        // body: {token}
    })
    .then(resp => {
        console.log(resp)
    })
    .catch(err => console.log(err))
  }
  return (
    <Router>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
    
              {localStorage.getItem("token") ? (
                <>
                  <Link to="/" style={{ fontSize: "20px", color: "darkBlue", fontWeight: "bold" }}>Sign Up</Link>
                  <Link to="/sign-in" style={{ marginLeft: "15px",fontSize: "20px", color: "darkBlue", fontWeight: "bold" }}>Sign In</Link>
                </>
              ) : (
                <Dashboard />
              )}
                  
            </div>
          </div>
        </div>

        <Switch>
            <Route path="/" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/dashoard" exact component={Dashboard} />
            <Route path="/product/new" exact component={AddProduct} />
        </Switch>
    </Router>
  );
}


export default App;
