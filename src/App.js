import { useEffect } from 'react';
import Layout from './components/UI/Layout';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile';

import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { userActions } from './store/user-slice'

function App() {
  const userInfo = useSelector(state => state.user);
  const dispatchUser = useDispatch()

  useEffect(()=>{
    const getUser = async() => {
      const token = localStorage.getItem("KTJ_Authentication_token");
      if(!token){
        return ;
      }
      const responseData = await fetch('http://localhost:8000/me',{
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      const response = await responseData.json();
      // console.log(response)
      dispatchUser(userActions.login({token: token, email: response.email, name:response.name, isAuthenticated: true}))
    } 
    
    getUser();
  },[])

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
