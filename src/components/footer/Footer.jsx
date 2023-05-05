import { Link } from 'react-router-dom';
import '../footer/footer.scss'
const Footer = () => {
  return (
    <footer>
      <nav>
        <ul className="footer-nav">
          <li>
            <Link to="/" className="footer-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="footer-item">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="footer-item">
              Register
            </Link>
          </li>
          <li>
            <Link to="/logout" className="footer-item">
              Logout
            </Link>
          </li>
          <li>
            <Link to="/developers" className="footer-item">
              Developers
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;