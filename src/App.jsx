import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CrudPage from "./pages/CrudPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Layout isAuth={isAuth} />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/user/:id" element={<ProductPage />} />

        <Route
          path="/crud"
          element={isAuth ? <CrudPage /> : <Navigate to="/login" />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
