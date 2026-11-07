import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {  

  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
          <ul
            style={{
              flexDirection: 'row'
            }}
            className="navbar-nav">
          <li className="nav-item active me-2">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default NavBar;