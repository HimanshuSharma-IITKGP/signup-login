import React from "react";
import classes from "./Navbar.module.css";
import { NavLink,Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const userInfo = useSelector((state)=> state.user);
  // console.log(userInfo)
  const dispatchUser = useDispatch()
  const history = useHistory();

  const logoutHandler = () => {
    dispatchUser(userActions.logout());
    localStorage.setItem("KTJ_Authentication_token", '');
    history.replace('/')
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link to='/' >Kshitij</Link>
      </div>
      <div className={classes["nav-list-div"]}>
        <ul className={classes["nav-list-ul"]}>
          {!userInfo.isAuthenticated && <li className={classes["nav-list-li"]}>
            <NavLink activeClassName={classes["active-link"]} to="/login">
              Login
            </NavLink>
          </li>}
          {!userInfo.isAuthenticated && <li className={classes["nav-list-li"]}>
            <NavLink activeClassName={classes["active-link"]} to="/signup">
              signup
            </NavLink>
          </li>}
          { userInfo.isAuthenticated && <li className={classes["nav-list-li"]}>
            <NavLink activeClassName={classes["active-link"]}  onClick={logoutHandler} to='/' >
              Logout
            </NavLink>
          </li>}
          {userInfo.isAuthenticated && <li className={classes["nav-list-li"]}>
            <NavLink activeClassName={classes["active-link"]} to="/profile">
              profile
            </NavLink>
          </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
