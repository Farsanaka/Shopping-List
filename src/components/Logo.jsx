import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className="flex items-center ml-8  ">
      <FontAwesomeIcon
        icon={faCartPlus}
        className="text-white text-4xl mr-3 my-2" // Increased size for the icon
      />
      <span className="text-white text-3xl my-2 font-semibold">Shoppie</span>{" "}
    </Link>
  );
};

export default Logo;
