import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../state/likes-slice";
import {
  isAuthenticated,
  selectToken,
  whoIsAuthenticated,
} from "../state/auth-slice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);

  const { wishlist } = useSelector((state) => state.likes);

  const { userId } = useSelector(whoIsAuthenticated);

  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);

  if (!authenticated) {
    return (
      <section className="container">
        <div
          className="d-flex flex-column align-items-center justify-content-center  p-4 text-center "
          style={{ marginTop: "200px" }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10"
            style={{ width: "80px", height: "80px" }}
          >
            <FaHeart size={40} className="text-danger" />
          </div>

          <h4 className="mt-4 fw-semibold">
            You need to have an account to save items to your wishlist
          </h4>
        </div>
      </section>
    );
  }
  return (
    <section className="container">
      <h1 className="text-center mb-4" style={{ marginTop: "100px" }}>
        My Wishlist
      </h1>
      <div className="row g-4 justify-content-center">
        {wishlist.length > 0 ? (
          wishlist.map((bouquet) => (
            <div className="col-12 col-md-10 col-lg-8" key={bouquet.id}>
              <div
                className="d-flex align-items-center border rounded shadow-sm p-1"
                style={{ gap: "20px" }}
              >
                <img
                  src={bouquet.image}
                  className="rounded"
                  alt={bouquet.title}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div>
                  <h3 className="card-title text-truncate mb-2">
                    {bouquet.name}
                  </h3>
                  <p className="card-text text-muted">{bouquet.description}</p>
                  <h6 className="d-inline-flex align-items-center rounded bg-danger bg-opacity-10 px-2 py-1 text-danger text-sm fw-medium border border-danger border-opacity-10 mb-0">
                    Prix: {bouquet.price} DA
                  </h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="d-flex flex-column align-items-center justify-content-center  p-4 text-center "
            style={{
              minHeight: "400px",
              borderRadius: "0.5rem",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10"
              style={{ width: "80px", height: "80px" }}
            >
              <FaHeart size={40} className="text-danger" />
            </div>

            <h4 className="mt-4 fw-semibold text-gray">
              Your whishlist is empty
            </h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
