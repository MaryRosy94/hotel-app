import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">Hotel</h1>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/rooms">Camere</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
