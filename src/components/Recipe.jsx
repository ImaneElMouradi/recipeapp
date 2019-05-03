import React, { Component } from "react";

import { Link } from "react-router-dom";

const API_KEY = "1dcbf73b1f90d1c40167264485eede61";

class Recipe extends Component {
  state = {
    activeRecipe: [],
    isLoading: true
  };

  async componentDidMount() {
    const title = this.props.location.state.recipe;
    const req = await fetch(
      `https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`
    );

    const res = await req.json();
    // console.log(res.recipes[0]);
    this.setState({ activeRecipe: res.recipes[0], isLoading: false });
  }

  render() {
    const {
      image_url,
      title,
      publisher,
      publisher_url
    } = this.state.activeRecipe;

    if (this.state.isLoading)
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    return (
      <div className="container">
        {this.state.activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img className="active-recipe__img" src={image_url} alt={title} />
            <h3 className="active-recipe__title">{title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span>{publisher}</span>
            </h4>
            <p className="active-recipe__website">
              Website:
              <span>
                <a href={publisher_url}>{publisher_url}</a>
              </span>
            </p>
            <Link to="/">
              <button className="active-recipe__button">Go Home</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
