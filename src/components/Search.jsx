import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import MovieData from "./MovieData";

const Search = () => {
  const [search, setSearch] = useState("");

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDA3M2Y5ZTMwNDFhOWZkYzlkYmYyN2RkYzhkYjVhYyIsIm5iZiI6MTcxOTI1NjM4OC4yMTYwNSwic3ViIjoiNjY3OWM0NDA2N2UyZTczNWU2NGUxOTg5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWSAriBBr0P85RGr4Hgq5NnsMn0kJCaHoGv6O61Dscg";

  // `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`

  const fetchSearch = async () => {
    const responseSearch = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          // application/json specifies that we're working with JSON data
          accept: "application/json",
          // takes in a token/apikey to validate our request
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    // Grabbing movie ID because we want data consistency!!! genres in search dont match genres in movie details
    const movieId = responseSearch.data.results[0].id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("use query!");
    console.log(response.data);
    return response.data;
  };

  // useQuery is going to call our fetch/async function that gets us our API data
  // if the query has already been made and our data is in the cache, useQuery is smart enough to not make that same API call again because we already have our data :)
  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movies"], // how react query knows what we have already made an api call for
    queryFn: fetchSearch, //function for making our API call
    enabled: false, //query will only run when we call it specifically, it won't run automatically
    refetchOnReconnect: true, //if our network goes down, but then goes back up, refetch our data
    retry: 3, //how many times we want to try after a failed call
    retryDelay: 3000, //retries after 3 seconds
    staleTime: 3 * 60 * 1000, // time in milliseconds! this is how long the most recent call to our API remains "fresh"
    gcTime: 15 * 60 * 1000, // this is how long our data stays in the cache if it hasn't been used
  });
  // useQuery("movies", fetchSearch) takes in just the queryKey and queryFn

  const handleSubmit = (event) => {
    event.preventDefault();
    //on submit, refetch our query (or in other words, make our API call)
    refetch();
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <Container>
      <Row>
        <Col>
          <Form
            className="w-100 p-4 border rounded mt-5"
            onSubmit={handleSubmit}
          >
            <FloatingLabel controlId="Search" label="Search Title">
              <Form.Control
                autoComplete="off"
                type="text"
                placeholder="Movie Title"
                onChange={(event) => setSearch(event.target.value)}
              />
            </FloatingLabel>
            <Button variant="outline-info" type="submit" className="mt-4">
              Search
            </Button>
          </Form>
        </Col>
        {movie && <MovieData />}
      </Row>
    </Container>
  );
};

export default Search;
