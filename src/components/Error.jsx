import React from "react";
import PropTypes from "prop-types";
import alertUrl from "../assets/alert.png";

export default function Error({ body }) {
  return (
    <div
      className="w-[350px] h-[87px] bg-[rgba(255, 255, 255, 0.85)] grid grid-cols-1 divide-y font-openSans
    border-solid border-[1px] border-[rgba(0, 0, 0, 0.1)] rounded shadow-xl
    mt-3.5  right-[39px] absolute"
    >
      <div className="message flex flex-row items-center">
        <div className="pl-3 pr-2 py-[9.5px]">
          <img src={alertUrl} alt="" />
        </div>
        <div className="text-[#DC3545] w-[271px] font-semibold text-sm">
          Error
        </div>
      </div>
      <div className="body h-12 flex items-center font-normal text-[#212529] text-base">
        <div className="pl-3 ">{body}</div>
      </div>
    </div>
  );
}

Error.propTypes = {
  body: PropTypes.string.isRequired,
};
