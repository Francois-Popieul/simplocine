import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./views/homepage";
import Moviepage from "./views/moviepage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Moviepage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
