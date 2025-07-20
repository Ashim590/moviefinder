import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
import SearchPage from "./pages/SearchPage";
import Section from "./pages/Section";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/singlePage/:name" element={<Section />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
