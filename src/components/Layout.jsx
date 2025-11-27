import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ isAuth }) => {
  return (
    <div>
      <Nav isAuth={isAuth} />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
