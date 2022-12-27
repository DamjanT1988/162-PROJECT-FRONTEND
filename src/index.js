import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewLayout from "./views/ViewLayout";
import Home from "./views/Home";
import Add from "./views/Add";
import Edit from "./views/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewLayout />}>
          <Route index element={<Home />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
