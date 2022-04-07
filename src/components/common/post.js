import React, { useState } from "react";
import "./post.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as likedIcon,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as noLikedIcon } from "@fortawesome/free-regular-svg-icons";

import { handleLikeRequest } from "../../api/app";

const Posts = (props) => {
  let user = props.user.userData;
  let recipe = props.recipeInfo;

  let favourites = props.favourites;
  let setFavourites = props.setFavourites;

  const [open, setOpen] = useState(false);
  const [isFav, setIsFav] = useState(
    // user.favourites.some((element) => element.food_item_id == recipe.id)
    favourites?.includes(recipe.id)
  );

  const handleLike = async (e) => {
    e.preventDefault();
    if (user) {
      const recipeId = recipe.id;
      try {
        setIsFav(!isFav);
        if (favourites.includes(recipe.id)) {
          setFavourites(favourites.filter((item) => item !== recipe.id));
        } else {
          setFavourites([...favourites, recipe.id]);
        }
        await handleLikeRequest(recipeId);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("user not authorized");
    }
    // setIsFav(true);
  };

  return (
    <Card className="cardFill">
      {/* <Card.Header className="text-center">
        <div className="d-inline font-weight-bold">{props.title}</div>
      </Card.Header> */}
      <Card.Img className="p-2" variant="top" src={props.media} />
      <div className="imgFooter josefinPost">
        <div className="center postTitle">{props.title}</div>
      </div>
      <Card.Body className="cardText">
        <Card.Text className="loraPost mt-2 mb-2">
          <div>Ready in {recipe.readyInMinutes} minutes</div>
          <div>Servings: {recipe.servings} </div>
          <div className="d-flex justify-content-end">
            <Button
              className="expand"
              variant="outline-light"
              onClick={() => setOpen(!open)}
              aria-controls="recipe Info"
              aria-expanded={open}
            >
              <FontAwesomeIcon
                className="center"
                icon={open ? faChevronUp : faChevronDown}
                fixedWidth
              />
            </Button>
          </div>
        </Card.Text>
        <Collapse in={open}>
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
        </Collapse>
      </Card.Body>
      <div className="footer">
        <div className="d-flex justify-content-end">
          <div className="center josefinPost">
            <Button
              className="redButton  btn-sm"
              variant="danger"
              href={`/recipe/${recipe.id}`}
            >
              View Recipe
            </Button>
          </div>
          <div className="center">
            <Button
              className={`likeButton ${isFav ? "liked" : ""}`}
              variant="outline-light"
              onClick={handleLike}
            >
              <FontAwesomeIcon
                icon={isFav ? likedIcon : noLikedIcon}
                fixedWidth
              />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Posts;
