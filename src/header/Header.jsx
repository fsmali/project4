import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../header/Header.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [logIn, setLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(localStorage.getItem('token') ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
  }, [location]);
  

  const onLogout = () => {

    localStorage.removeItem('token');
    setLogin(false);
    navigate('/');
  };

  const navigationLinks = [
    { title: 'Home', slug: '/' },
    { title: 'Developers', slug: '/developers' },
    // { title: 'Create New Developer', slug: '/create-developer' },




  ];

  return (
    <header>
      <nav>
        <ul className="header-nav">
          {navigationLinks.map((elem, idx) => (
            <Link key={idx} to={elem.slug} className="header-item">
              <li className="header_li">{elem.title}</li>
            </Link>
          ))}
          <ul className="header-nav">
            {logIn ? (
              <>
                <li>
                  <Link to="/"></Link>
                </li>
                <li className="header_li">
                  <Link className="header-item" to="/create-developer">
                    Create New Developer
                  </Link>
                </li>
                <li className="header_li" onClick={onLogout}>
                  <Link className="header-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="header_li">
                  <Link className="header-item" to="/register">
                    Register
                  </Link>
                </li>
                <li className="header_li">
                  <Link className="header-item" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
