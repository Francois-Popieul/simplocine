import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./views/homepage";
import Moviepage from "./views/moviepage";
import { Serieslistpage } from "./views/serieslistpage";
import { Movielistpage } from "./views/movielistpage";
import { Seriespage } from "./views/seriespage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Moviepage />} />
        <Route path="/series/:id" element={<Seriespage />} />
        <Route path="/movie-list" element={<Movielistpage />} />
        <Route path="/series-list" element={<Serieslistpage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
