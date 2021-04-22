import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const BASE_URL = "http://127.0.0.1:8080/";


  useEffect(() => {
    getMovies('');
  }, []);



  const getMovies = async (keyword : string) => {
    console.log(" Search This ",keyword);
    let url = BASE_URL+ `api/movies?keyword=${keyword}`;
    let response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      console.log(json);
      let movieCount = json.length;
      console.log("Nuber of movies ",movieCount);
      setMovieList(json);
      setMovieCount(movieCount);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  return (
    <div className="main">
      <div className="inner-main">
        <div className="flex flex-row justify-between header">
          <div style={{ padding: 10, fontWeight: "bold" }}>Movies</div>
          <div className="flex flex-row">
            <div style={{ padding: 10 }}>search</div>
            <div>
              <input type="text" className="search-text" onChange={(event)=>{getMovies(event.target.value)}}></input>
            </div>
          </div>
        </div>
        
        <div className="movie-list-wrap">
        {movieList.map(function(movie:any){
            return (
              <div key={movie.id} className="movie">
            <p>{`${movie.name} (${movie.year})`}</p>
            <p>{movie.description}</p>
          </div>
            )
 })} 
          
          
        </div>
        <div className="footer">
          <p>Number of Movies : {movieCount}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
