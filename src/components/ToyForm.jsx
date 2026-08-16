import React from "react";

function ToyForm({ onAddToy }) {
  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      name: event.target.elements.name.value,
      image: event.target.elements.image.value,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => {
        onAddToy(toy);
        event.target.reset();
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />

        <br />

        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />

        <br />

        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
