import Layout from './components/UI/Layout';
import { Redirect, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile';

import {useSelector} from 'react-redux'

function App() {
  const userInfo = useSelector(state => state.user);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          {userInfo.isAuthenticated && <Route path="/profile" exact>
            <Profile />
          </Route>}
          <Route path='*' >
            <div>404 page</div>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
