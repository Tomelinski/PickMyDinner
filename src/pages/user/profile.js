import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { getSpoonRecipeById, getFavourites } from "../../api/app";
import "./profile.css";

import Image from "react-bootstrap/Image";

import { Jumbotron } from "react-bootstrap";
import Post from "../../components/common/post";

const Profile = () => {
  const user = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { firstName, lastName, email } = user.userData;

  useEffect(() => {
    setFavourites([]);
    const getData = async () => {
      await getFavourites()
        .then((res) => {
          setFavourites(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [user]);

  useEffect(() => {
    setRecipes([]);
    const getRecipeData = () => {
      favourites.forEach(async (id) => {
        await getSpoonRecipeById(id)
          .then((res) => {
            console.log(res);
            setRecipes((prevState) => [...prevState, res]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    getRecipeData();
  }, [user, favourites]);

  return (
    <>
      <Jumbotron>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="d-flex flex-column align-items-center text-center">
              <div
                style={{ width: 150, height: 150 }}
                className="bg-secondary d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
              >
                <Image
                  src={"/logo.png"}
                  alt="User profile pic"
                  style={{ maxWidth: 150, maxHeight: 150 }}
                />
              </div>
              <div className="mt-3">
                <h4>
                  {firstName} {lastName}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {firstName} {lastName}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">{email}</div>
            </div>
          </div>
        </div>
      </Jumbotron>
      <div>
        <div>
          <h2 className="lora-big">Favourites</h2>
        </div>
        {recipes?.length > 0 && (
          <div className="row cardSize">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col cardValue">
                <Post
                  media={recipe.image}
                  title={recipe.title}
                  recipeInfo={recipe}
                  user={user}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
