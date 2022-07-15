import React, { useState } from "react";
import PropTypes from "prop-types";
import { isValidUsername, isVAlidPassword } from "../utils/validInputs";

export default function RegistrationInput({ placeholder, value, set }) {
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    set(e.target.value);
    if (placeholder === "username") {
      if (isValidUsername(e.target.value)) setValid(true);
      else setValid(false);
    } else if (isVAlidPassword(e.target.value)) setValid(true);
    else setValid(false);
  };

  return (
    <input
      className={`${valid === true ? "border-emerald-600" : "border-red-500"} h-[46px] rounded-lg border-[1px] outline-none px-4 border-solid`}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}

RegistrationInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};
