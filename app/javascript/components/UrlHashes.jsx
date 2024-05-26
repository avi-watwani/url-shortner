import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UrlHashes = () => {
  const navigate = useNavigate();
  const [urlHashes, setUrlHashes] = useState([]);

  useEffect(() => {
    const url = "/api/v1/url_hashes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setUrlHashes(res))
      .catch(() => navigate("/"));
  }, []);

  const allUrlHashes = urlHashes.map((urlHash, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{urlHash.short}</h5>
          <Link to={`/url_hash/${urlHash.id}`} className="btn custom-button">
            Open URL
          </Link>
        </div>
      </div>
    </div>
  ));
  const noUrlHash = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No urls yet. Why not <Link to="/new_url">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">URLs shortened</h1>
          <p className="lead text-muted">
            Our database...
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/url_hash" className="btn custom-button">
              Create New Short URL
            </Link>
          </div>
          <div className="row">
            {urlHashes.length > 0 ? allUrlHashes : noUrlHash}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default UrlHashes;
