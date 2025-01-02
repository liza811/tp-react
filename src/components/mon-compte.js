import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authError,
  isAuthenticated,
  loginUser,
  logout,
  selectToken,
  whoIsAuthenticated,
} from "../state/auth-slice";
import {
  fetchUserTransactions,
  selectTransactions,
} from "../state/transaction-slice";
import { TransactionList } from "./transaction-list";
const LoginForm = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);
  const { fullname, userId } = useSelector(whoIsAuthenticated);
  const token = useSelector(selectToken);
  const transactions = useSelector(selectTransactions);
  console.log(`edd ${transactions}`);
  const error = useSelector(authError);

  const [formData, setFormData] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchUserTransactions(userId, token));
    }
  }, [dispatch, token, userId]);
  return (
    <section className="container">
      <div
        className="row justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="col-md-6">
          <h1 className="text-center mb-4 mt-5">
            {" "}
            {authenticated ? "Mon Compte" : "Se Connecter"}{" "}
          </h1>
          <div className="card">
            <div className="card-body">
              {authenticated ? (
                <div className="text-center">
                  <h3 className="mb-4">Bienvenue, {fullname}!</h3>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(logout())}
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="login"
                      placeholder="Login"
                      value={formData.login}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: "10px" }}
                    >
                      Connexion
                    </button>
                  </div>
                  {error && (
                    <p className="text-danger mt-3 text-center">{error}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Mes Transactions</h5>
        </div>
        <div className="card-body">
          {transactions && <TransactionList transactions={transactions} />}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
