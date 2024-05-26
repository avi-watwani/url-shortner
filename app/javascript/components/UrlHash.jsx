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

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {urlHash.short}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
        <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Long URL</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${urlHash.long}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
            >
              Delete URL
            </button>
          </div>
        </div>
        <Link to="/url_hashes" className="btn btn-link">
          Back to URLs
        </Link>
      </div>
    </div>
  );
};

export default UrlHash;
