import React, { useState } from "react";
import axios from "axios";

function add() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [fp, setFP] = useState("");

  function nameChange(e) {
    setName(e.target.value);
  }

  function roleChange(e) {
    setRole(e.target.value);
  }

  function ageChange(e) {
    setAge(e.target.value);
  }

  function fpChange(e) {
    setFP(e.target.value);
  }

  function addCharacter() {
    let newChar = {
      routeName: name.split(" ").join("").toLowerCase(),
      name: name,
      role: role,
      age: age,
      forcePoints: fp,
    };

    axios
      .post("http://localhost:5000/api/characters/", newChar)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        <a href="/all">
          <button className="btn btn-danger btn-lg">
            <span className="fa fa-th-list"></span> All Characters
          </button>
        </a>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">Add Characters</div>
            <div className="card-body">
              <form role="form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={nameChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={roleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={ageChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="force-points">Force Points</label>
                  <input
                    type="text"
                    className="form-control"
                    id="force-points"
                    value={fp}
                    onChange={fpChange}
                  />
                </div>
              </form>
              <br />
              <div className="text-right">
                <button
                  className="btn btn-primary btn-md"
                  id="add-btn"
                  onClick={addCharacter}
                >
                  <span className="fa fa-fire"></span> Add to the Force
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default add;
