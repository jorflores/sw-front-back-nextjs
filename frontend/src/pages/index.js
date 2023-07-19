import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [character, setCharacter] = useState("");
  const [data, setData] = useState([]);

  function searchCharacter() {
    axios
      .get("http://localhost:5000/api/characters/" + character)
      .then(function (response) {
        console.log(response);
        setData(response.data);
      });
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Star Wars Version - NextJS</h1>
        <h3>The greatest resource in the galaxy for Star Wars statistics!</h3>
        <hr />
        <a href="/add">
          <button className="btn btn-danger btn-lg">
            <span className="fa fa-plus"></span> Add New Character
          </button>
        </a>

        <a href="/all">
          <button className="btn btn-danger btn-lg">
            <span className="fa fa-th-list"></span> All Characters
          </button>
        </a>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h3>
                <strong>Character Search</strong>
              </h3>
            </div>
            <div className="card-body">
              <input
                type="text"
                id="character-search"
                className="form-control"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              />
              <br />
              <div className="text-right">
                <button
                  className="btn btn-primary btn-md"
                  id="search-btn"
                  onClick={searchCharacter}
                >
                  <span className="fa fa-search"></span> Search Your Feelings.
                  You know it to be true.
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>
                <strong>Character Statistics</strong>
              </h3>
            </div>
            <div className="card-body">
              {data.length > 0 && (
                <div>
                  <h2 id="name">{data[0].name}</h2>
                  <div id="stats">
                    <h3>
                      <strong>Role:</strong>{" "}
                      <span id="role">{data[0].role}</span>
                    </h3>
                    <h3>
                      <strong>Age:</strong> <span id="age">{data[0].age}</span>
                    </h3>
                    <h3>
                      <strong>Force Points:</strong>{" "}
                      <span id="force-points">{data[0].forcePoints}</span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
