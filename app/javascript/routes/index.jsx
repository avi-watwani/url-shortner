import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import UrlHashes from "../components/UrlHashes";
import UrlHash from "../components/UrlHash";
import NewUrlHash from "../components/NewUrlHash";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/url_hashes" element={<UrlHashes />} />
      <Route path="/url_hash/:id" element={<UrlHash />} />
      <Route path="/url_hash" element={<NewUrlHash />} />
    </Routes>
  </Router>
);
