import { useEffect, useState } from "react";
import axios from "axios";

export const useMovieData = () => {
  const [movieData, setMovieData] = useState({});

  // use your API Read Access Token!!!
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDA3M2Y5ZTMwNDFhOWZkYzlkYmYyN2RkYzhkYjVhYyIsIm5iZiI6MTcxOTI1NjM4OC4yMTYwNSwic3ViIjoiNjY3OWM0NDA2N2UyZTczNWU2NGUxOTg5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWSAriBBr0P85RGr4Hgq5NnsMn0kJCaHoGv6O61Dscg";

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieId = Math.floor(Math.random()*1000)

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              // application/json specifies that we're working with JSON data
              accept: "application/json",
              // takes in a token/apikey to validate our request
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
   
        setMovieData(response.data);
      } catch (error) {
        console.log("Error fetching movie data: ", error);
      }
    };
    fetchMovieData();
  }, []); // empty dependency array so useEffect function will only run on initial render

  return { movieData }
};
