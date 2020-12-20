import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes } from "./routes";
import { Header } from "./components/header";
import { Message } from "./components/toastr";
import { Footer } from "./components/footer";
import { useSelector } from "react-redux";
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global'
import { light, dark } from './styles/themes'
import usePersistedState from "./utils/usePersistedState";

const App = () => {
  const [theme, setTheme] = usePersistedState('theme', light)
  const isAuth = useSelector((state) => state.usuarios.isAuth);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isAuth && <Header toggleTheme={toggleTheme} />}
      <Message />
      <Routes />
      {isAuth && <Footer />}
    </ThemeProvider>
  );
};
export default App;
