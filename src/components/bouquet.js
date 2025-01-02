import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedBouquetsIds, toggleLike } from "../state/likes-slice";
import { addToCart } from "../state/cart-slice";
import { fetchBouquets } from "../state/bouquet-slice";
import {
  isAuthenticated,
  selectToken,
  whoIsAuthenticated,
} from "../state/auth-slice";

const Bouquets = () => {
  const dispatch = useDispatch();

  const { bouquets } = useSelector((state) => state.bouquets);
  const { likedBouquets } = useSelector((state) => state.likes);
  const authenticated = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  const { userId } = useSelector(whoIsAuthenticated);

  const [loadingId, setLoadingId] = useState();
  const [likesState, setLikesState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalLikedBy, setModalLikedBy] = useState([]);

  useEffect(() => {
    dispatch(fetchBouquets(token));
    dispatch(fetchLikedBouquetsIds(userId));

    const initialLikesState = {};
    bouquets.forEach((bouquet) => {
      initialLikesState[bouquet.id] = bouquet.likes;
    });
    setLikesState(initialLikesState);
  }, [bouquets, dispatch, token, userId]);

  const handleLike = (id) => {
    const userId = 1;
    dispatch(toggleLike({ bouquetId: id, userId, token }));
    const liked = likedBouquets.includes(id);

    setLikesState((prevState) => ({
      ...prevState,
      [id]: liked ? prevState[id] - 1 : prevState[id] + 1,
    }));
  };

  const handleAddToCart = (bouquet) => {
    setLoadingId(bouquet.id);
    dispatch(addToCart(bouquet));
    setTimeout(() => {
      setLoadingId(null);
    }, 1000);
  };

  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringModal, setIsHoveringModal] = useState(false);

  const handleMouseEnterButton = (likedBy) => {
    setModalLikedBy(likedBy);
    setIsHoveringButton(true);
    setShowModal(true);
  };

  const handleMouseLeaveButton = () => {
    setIsHoveringButton(false);
    if (!isHoveringModal) setShowModal(false);
  };

  const handleMouseEnterModal = () => {
    setIsHoveringModal(true);
  };

  const handleMouseLeaveModal = () => {
    setIsHoveringModal(false);
    if (!isHoveringButton) setShowModal(false);
  };

  return (
    <section className="container py-5">
      <h1 className="display-5 text-center mb-5" style={{ marginTop: "50px" }}>
        Carte de Visite
      </h1>
      <div className="row g-4">
        {bouquets.map((bouquet) => {
          const isLiked = likedBouquets.includes(bouquet.id);
          return (
            <div className="col-sm-6 col-md-4 col-lg-3" key={bouquet.id}>
              <div className="card h-100 shadow-sm hover-shadow-md transition-all duration-300 border-0 overflow-hidden">
                <div className="position-relative overflow-hidden card-img-wrapper">
                  <img
                    src={bouquet.image}
                    className="card-img-top transition-transform duration-300 hover-scale"
                    alt={bouquet.name}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transform: "scale(1)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />

                  <button
                    disabled={!authenticated}
                    onClick={() => handleLike(bouquet.id)}
                    className="position-absolute top-0 end-0 m-2 p-0 bg-transparent border-0 d-flex flex-column align-items-center"
                    style={{ zIndex: 1 }}
                  >
                    {isLiked && authenticated ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="gray" size={24} />
                    )}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() =>
                        handleMouseEnterButton(bouquet.likedBy, bouquet.id)
                      }
                      onMouseLeave={handleMouseLeaveButton}
                    >
                      {likesState[bouquet.id] || bouquet.likes}
                    </span>
                  </button>

                  {showModal && (
                    <div
                      className="modal show d-block"
                      tabIndex={-1}
                      role="dialog"
                      onMouseEnter={handleMouseEnterModal}
                      onMouseLeave={handleMouseLeaveModal}
                    >
                      <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content border-0 shadow-lg">
                          <div className="modal-header border-bottom-0 py-2">
                            <h6 className="modal-title fw-semibold">
                              Liked By
                            </h6>
                            <button
                              type="button"
                              className="btn-close"
                              aria-label="Close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body pt-0">
                            <ul className="list-unstyled mb-0">
                              {modalLikedBy.map((user, index) => (
                                <li
                                  key={index}
                                  className="py-1 px-3 hover-bg-light rounded"
                                >
                                  {user.fullname}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5
                      className="card-title text-truncate mb-0 me-2"
                      style={{ maxWidth: "65%" }}
                    >
                      {bouquet.name}
                    </h5>
                    {bouquet.price && (
                      <h6 className="d-inline-flex align-items-center rounded bg-danger bg-opacity-10 px-2 py-1 text-danger text-sm fw-medium border border-danger border-opacity-10 mb-0">
                        {bouquet.price} DA
                      </h6>
                    )}
                  </div>

                  <p className="card-text text-muted small mb-3">
                    {bouquet.description}
                  </p>

                  <button
                    className={`btn btn-dark mt-auto ${
                      loadingId === bouquet.id ? "disabled" : ""
                    } ${!authenticated ? "disabled opacity-50" : ""}`}
                    onClick={() => handleAddToCart(bouquet)}
                    disabled={loadingId === bouquet.id || !authenticated}
                  >
                    {loadingId === bouquet.id ? (
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaSpinner className="spinner-border spinner-border-sm" />
                        <span>Adding...</span>
                      </div>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Bouquets;
