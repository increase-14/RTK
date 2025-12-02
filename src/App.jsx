import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CrudPage from "./pages/CrudPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import FaqPage from "./pages/FaqPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<ProductPage />} />
        <Route path="/crud" element={<CrudPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
