import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        // background: "red",
        color: "grey",
        textAlign: "center",
      }}
    >
      <p>
      Desenvolvido com ❤ por:
        <a 
        style={{color:'grey'}} 
        href="https://github.com/juaanluna"> Juan Luna</a>
      </p>
    </div>
  );
};
export default Footer;
