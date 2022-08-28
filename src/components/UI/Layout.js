import Navbar from "../Navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.children} >{props.children}</div>
    </div>
  );
};

export default Layout;
