import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Get all toys when the application loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add the newly created toy to our state
  function handleAddToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }
function handleDeleteToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  }).then(() => {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== id)
    );
  });
}
  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
<ToyContainer toys={toys} onDeleteToy={handleDeleteToy} />
    </>
  );
}

export default App;
