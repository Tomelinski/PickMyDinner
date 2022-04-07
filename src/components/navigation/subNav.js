import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./subNav.css";

import Button from "react-bootstrap/Button";

const SubNav = () => {
  const handleRandomRecipe = () => {};

  return (
    <div className="navigation subCenter pt-5 pb-4">
      <div className="d-inline-block subCenter lora-bigSub mb-3">
        Picking your food, made{" "}
        <div className="d-inline-block orange">simple</div>
      </div>
      <div className="subCenter loraSub mb-5 pb-3">
        We'll give you 6 random recipes. If you don't like any of them, just try
        again!
      </div>
      {/* <div className="subCenter mb-4">
        <Button className="josefinSub randomButton" variant="warning">
          FIND ME RANDOM RECIPES
        </Button>
      </div> */}
    </div>
  );
};

export default SubNav;
