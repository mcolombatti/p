import React from "react";
import Active from "../images/fav.png";
import Inactive from "../images/nofav.png";
 

function ToggleImages({ active, handleChangeActive }) {
  return (
    <>
      
      <div className="toggle-wrapper">
        {active ? (
          <img
            className="active"
            src={Active}
            alt="yellow star"
            onClick={() => handleChangeActive()}
          />
        ) : (
          <img
            className="inactive"
            src={Inactive}
            alt="black and white star"
            onClick={() => handleChangeActive()}
          />
        )}
      </div>
    </>
  );
}

export default ToggleImages;