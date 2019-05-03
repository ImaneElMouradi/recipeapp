//https://www.food2fork.com/about/api

import React, { Component } from "react";

import Form from "./Form";
import Recipes from "./Recipes";

const API_KEY = "1dcbf73b1f90d1c40167264485eede61";

class Main extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const recipeName = e.target.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`
    );

    const data = await api_call.json();

    this.setState({ recipes: data.recipes });
  };

  componentDidMount() {
    const json = sessionStorage.getItem("recipes");

    const recipes = JSON.parse(json);

    if (recipes) this.setState({ recipes });
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes);
    sessionStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">recipe search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default Main;
