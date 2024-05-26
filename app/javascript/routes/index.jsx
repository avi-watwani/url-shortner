import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import UrlHashes from "../components/UrlHashes";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/url_hashes" element={<UrlHashes />} />
    </Routes>
  </Router>
);
