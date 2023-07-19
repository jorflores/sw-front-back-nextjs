import React, { useEffect, useState } from "react";
import axios from "axios";

function all() {
  const [data, setData] = useState([]);

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
                    <button className="btn btn-warning btn-lg">Delete</button>
                    <button className="btn btn-primary btn-lg">Update </button>
                    <hr />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default all;
