import React from "react";
import "./Button.scss";

const Button = ({ variant, text, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className={"default-btn " + variant}>
      {text}
    </button>
  );
};

export default Button;
