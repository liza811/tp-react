import React from "react";

const Home = () => {
  return (
    <>
      <section className="container-fluid p-0 ">
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="bouquet4.jpg"
                className="d-block w-100"
                style={{ height: "53vh", objectFit: "cover" }}
                alt="Bouquet de roses"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Bouquet de roses</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="bouquet9.jpg"
                className="d-block w-100"
                style={{ height: "53vh", objectFit: "cover" }}
                alt="Bouquet de tulipes"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Bouquet de roses</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="bouquet6.jpg"
                className="d-block w-100"
                style={{ height: "53vh", objectFit: "cover" }}
                alt="Bouquet de lys"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Bouquet de roses</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="bouquet10.jpg"
                className="d-block w-100"
                style={{ height: "53vh", objectFit: "cover" }}
                alt="Bouquet champêtre"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Bouquet roses</h5>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <div className="hero-section position-relative bg-pink-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="bouquet4.jpg"
                alt="Floral arrangement"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-3">
                New
                <br />
                Collections
              </h1>
              <p className="h4 mb-4 text-muted">A PERFECT BOUQUET</p>
              <button className="btn btn-dark px-4 py-2">Shop now</button>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 end-0 me-4 mb-4">
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-dark rounded-circle"></button>
            <button className="btn btn-sm btn-outline-dark rounded-circle"></button>
            <button className="btn btn-sm btn-outline-dark rounded-circle"></button>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-8">
            <div className="position-relative bg-light p-4 h-100">
              <div className="row align-items-center">
                <div className="col-6">
                  <img src="F2.jpeg" alt="Lavender" className="img-fluid" />
                </div>
                <div className="col-6">
                  <h2 className="h1 mb-3">Lavender Collections</h2>
                  <p className="mb-3">SALE UP TO 20% OFF</p>
                  <button className="btn btn-outline-dark">Read more</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-4 h-100">
              <img src="F3.jpeg" alt="Tulips" className="img-fluid mb-3" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-4 h-100">
              <h3 className="h2 mb-3">Rose</h3>
              <img src="F4.jpeg" alt="Rose tea" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="position-relative bg-pink-light p-4 h-100">
              <div className="row align-items-center">
                <div className="col-6">
                  <p className="text-muted mb-2">SALE UP TO 30% OFF</p>
                  <h2 className="h1 mb-3">Happy Women's day</h2>
                  <button className="btn btn-dark">Shop now</button>
                </div>
                <div className="col-6">
                  <img src="F2.jpeg" alt="Women's day" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
