import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import "./searchResults.css";

function SearchPhotos() {
  const unsplash = new Unsplash({
    accessKey: process.env.REACT_APP_UNSPLASH_SECRET
  });

  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  useState(() => {
    unsplash.photos.listPhotos(2, 150, "latest")
    .then(toJson)
    .then(json => {
        setPics(json);
        console.log(json)
    });
  })

  const searchUnsplashPhotos = (e) => {
    e.preventDefault();
    unsplash.search
      .photos(query, 1, 1000)
      .then(toJson)
      .then((json) => {
        setPics(json.results);
        console.log(json.results)
      });
  };
  return (
    <>
      <form onSubmit={searchUnsplashPhotos}>
        <h1>
          <span role="img" aria-label="Camera Image">
            📷
          </span>{" "}
          Search hi-res photos
        </h1>
        <br />
        <input
          type="text"
          name="query"
          placeholder="Search Photos"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button type="submit">Search Photos</button>
      </form>
      <div className="photos-Results">
       
        {pics.map((pic) => (
          <div className="img-container" key={pic.id}>
            <img src={pic.urls.small} alt={pic.alt_description} />

            <div className="user-info"><img className="profile_pic" src={pic.user.profile_image.small} alt={pic.user.name} /> {pic.user.name}</div>
            <div className="image-container-footer"><a href={pic.links.download+"?force=true"}><img src={require('./downloading.png')} alt="download icon"/></a></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchPhotos;
