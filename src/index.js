import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewLayout from "./views/ViewLayout";
import Home from "./views/Home";
import Add from "./views/Add";
import Edit from "./views/Edit";

//export app
export default function App() {
  //use React methods to link view as multi-page solution
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

//render the app to root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
