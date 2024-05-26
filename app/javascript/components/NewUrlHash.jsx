import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewUrlHash = () => {
  const navigate = useNavigate();
  const [long, setLong] = useState("");

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/url_hashes/create";

    if (long.length == 0)
      return;

    const body = {
      long: stripHtmlEntities(long)
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/url_hash/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Create a new Short URL.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="longUrl">Long URL</label>
              <input
                type="text"
                name="long"
                id="longUrl"
                className="form-control"
                required
                onChange={(event) => onChange(event, setLong)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Short URL
            </button>
            <Link to="/url_hashes" className="btn btn-link mt-3">
              Back to URLs
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUrlHash;
