import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UrlHash = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [urlHash, seturlHash] = useState({ short: '', long: '' });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => seturlHash(response))
      .catch(() => navigate("/url_hashes"));
  }, [params.id]);

  const navigateToLongUrl = () => {
    navigate(`/${urlHash.short}`);
  };

  const deleteUrlHash = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/url_hashes"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          Short URL Generated!
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
          <button
              type="button"
              className="btn btn-link"
              onClick={navigateToLongUrl}
            >
              http://localhost:3000/{urlHash.short}
            </button>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteUrlHash}
            >
              Delete URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlHash;
