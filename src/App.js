import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes } from "./routes";
import { Header } from "./components/header";
import { Message } from "./components/toastr";
import { Footer } from "./components/footer";
import { useSelector } from "react-redux";

const App = () => {
  const isAuth = useSelector((state) => state.usuarios.isAuth);
  return (
    <>
      {isAuth && <Header />}
      <Message />
      <Routes />
      {isAuth && <Footer />}
    </>
  );
};
export default App;
