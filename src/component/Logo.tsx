import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="navbar-brand" to="/">
      <img
        src={logo}
        alt="Logo"
        width={48}
        height={48}
        className="rounded-circle"
      />
    </Link>
  );
};

export default Logo;