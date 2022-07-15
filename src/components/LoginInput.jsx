import React from "react";
import PropTypes from "prop-types";

export default function LoginInput({ placeholder, value, set }) {
  const handleChange = (e) => {
    set(e.target.value);
  };

  return (
    <input
      className="h-[46px] rounded-lg border-[1px] outline-none px-4 border-solid"
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}

LoginInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};
