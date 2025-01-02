import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  logout,
  whoIsAuthenticated,
  isAuthenticated,
} from "../state/auth-slice";

export function NavbarComponent() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/";
  };
  const { fullname } = useSelector(whoIsAuthenticated);
  const authenticated = useSelector(isAuthenticated);

  const compteLabel = fullname || "Se Connecter";
  const cart = useSelector((state) => state.cart.cart || []);
  const cartItemCount = cart.length;

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/Bouquets", label: "Bouquets" },
    { to: "/fleurs", label: "Fleurs" },
    { to: "/cart", label: "Panier" },
    { to: "/whishlist", label: "Wishlist" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="flower.png"
            alt="flower"
            width="35"
            className="d-inline-block align-top me-2"
          />
          <span className="h3 font-weight-bold m-0">Flower</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.label}>
                {item.label === "Panier" ? (
                  <div className="position-relative">
                    <Link
                      to={item.to}
                      className={`nav-link ${
                        location.pathname === item.to
                          ? "text-danger fw-bold"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>

                    {cartItemCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{
                          fontSize: "10px",
                          marginLeft: "-10px",
                          marginTop: "5px",
                        }}
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`nav-link ${
                      location.pathname === item.to ? "text-danger fw-bold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="nav-item dropdown">
              <Link
                to={authenticated ? "#" : "/compte"}
                className={`nav-link d-flex align-items-center ${
                  authenticated ? "dropdown-toggle" : ""
                } ${
                  location.pathname === "/compte" ? "text-danger fw-bold" : ""
                }`}
                id="userDropdown"
                role="button"
                data-bs-toggle={authenticated ? "dropdown" : undefined}
                aria-expanded="false"
              >
                <span className="me-2">{compteLabel}</span>
                <FaUserCircle size={24} />
              </Link>

              {authenticated && (
                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow-sm"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link
                      to="/compte"
                      className="dropdown-item  px-4 d-flex align-items-center"
                    >
                      <span>Mon Compte</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item px-4 d-flex align-items-center "
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      <span>Déconnexion</span>
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
