import React, { useEffect, useState } from "react";
import axios from "axios";

function all() {
  function deleteCharacter(id) {
    axios.delete("http://localhost:5000/api/delete/" + id).then((response) => {
      console.log(response);
      getAllCharacters();
    });
  }

  function showUpdateCharacter(character) {
    setCharacterToUpdate(character);
    setShowUpdateModal(true);
  }

  function updateCharacter(personaje) {
    axios
      .put("http://localhost:5000/api/update", personaje)
      .then((response) => {
        console.log(response);
        getAllCharacters();
      });
  }

  const [data, setData] = useState([]);
  const [characterToUpdate, setCharacterToUpdate] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function getAllCharacters() {
    axios.get("http://localhost:5000/api/characters/").then((response) => {
      console.log(response);
      setData(response.data);
    });
  }

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Star Wars Express</h1>
        <h3>The greatest resource in the galaxy for Star Wars statistics!</h3>
        <hr />
        <a href="/">
          <button className="btn btn-danger btn-lg">
            <span className="fa fa-eye"></span> Search Characters
          </button>
        </a>
        <a href="/add">
          <button className="btn btn-danger btn-lg">
            <span className="fa fa-plus"></span> Add New Character
          </button>
        </a>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <strong>Character Database</strong>
            </div>
            <div className="card-body">
              <ul id="character-section" className="list-group"></ul>
              {data.map((info) => {
                return (
                  <li className="list-group-item" key={info._id}>
                    <h2>Name: {info.name}</h2>
                    <h3>Role: {info.role}</h3>
                    <h3>Age: {info.age}</h3>
                    <h3>Force Points: {info.forcePoints}</h3>
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={() => deleteCharacter(info._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => showUpdateCharacter(info)}
                    >
                      Update{" "}
                    </button>
                    <hr />
                  </li>
                );
              })}

              {showUpdateModal && characterToUpdate && (
                <div className="update-modal">
                  {/* Create a form or modal to update the character data */}
                  {/* For simplicity, let's assume we have input fields for name, role, age, and forcePoints */}
                  <h2>Update Character</h2>
                  <input
                    type="text"
                    value={characterToUpdate.name}
                    onChange={(e) =>
                      setCharacterToUpdate({
                        ...characterToUpdate,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={characterToUpdate.role}
                    onChange={(e) =>
                      setCharacterToUpdate({
                        ...characterToUpdate,
                        role: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={characterToUpdate.age}
                    onChange={(e) =>
                      setCharacterToUpdate({
                        ...characterToUpdate,
                        age: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={characterToUpdate.forcePoints}
                    onChange={(e) =>
                      setCharacterToUpdate({
                        ...characterToUpdate,
                        forcePoints: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => updateCharacter(characterToUpdate)}>
                    Save
                  </button>
                  <button onClick={() => setShowUpdateModal(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default all;
