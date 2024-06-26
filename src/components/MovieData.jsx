import { Card, ListGroup, Container } from "react-bootstrap";
import { useMovieData } from "../hooks/useMovieData";
import { Star } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { addItem } from "../features/wishListSlice";
import { postToWatchList } from "../features/watchListSlice";
import { useQueryClient } from "@tanstack/react-query";

const MovieData = () => {
  let { movieData } = useMovieData();
  // ["Crime", "Thriller", "romance"]
  // console.log(movieData.genres.map((genre) => genre.name).join(', '))

  const queryClient = useQueryClient();

  // get the global state of our 'movies' data from our cache
  const searchData = queryClient.getQueryData(['movies'])

  if (searchData) { movieData = searchData }

  const dispatch = useDispatch();

  //we want to add movieData to our global wishList state array
  const handleAddWishList = (movieData) => {
    const movie = {
      id: movieData.id,
      original_title: movieData.original_title,
      poster_path: `https://image.tmdb.org/t/p/w185/${movieData.poster_path}`,
      genres: movieData.genres &&
      movieData.genres.map((genre) => genre.name).join(", "),
      overview: movieData.overview,
      release_date: movieData.release_date,
      popularity: movieData.popularity,
    }
    //dispatch the addItem action
    dispatch(addItem(movie))
  }

  const handleAddWatchList = (movieData) => {
    const movie = {
      id: movieData.id,
      original_title: movieData.original_title,
      poster_path: `https://image.tmdb.org/t/p/w185/${movieData.poster_path}`,
      genres: movieData.genres &&
      movieData.genres.map((genre) => genre.name).join(", "),
      overview: movieData.overview,
      release_date: movieData.release_date,
      popularity: movieData.popularity,
    }

    dispatch(postToWatchList(movie))
  }

  return (
    <Container>
      <Card className="d-flex flex-row p-3 shadow h-100">
        <Card.Img
          variant="top"
          className="border rounded h-100 w-auto img-fluid"
          src={`https://image.tmdb.org/t/p/w185/${movieData.poster_path}`}
        />
        <Card.Body>
          <Card.Title>
            {movieData.original_title}
            <Star color="gold" className="ms-1" onClick={() => handleAddWishList(movieData)}/>
          </Card.Title>

          <Card.Text>{movieData.overview}</Card.Text>

          <ListGroup>
            <ListGroup.Item>
              Genres:{" "}
              {movieData.genres &&
                movieData.genres.map((genre) => genre.name).join(", ")}
            </ListGroup.Item>
            <ListGroup.Item>
              Runtime: {movieData.runtime} minutes
            </ListGroup.Item>
            <ListGroup.Item>
              Release Date: {movieData.release_date}
            </ListGroup.Item>
            <ListGroup.Item>Popularity: {movieData.popularity}</ListGroup.Item>
          </ListGroup>

          <Card.Link className="btn btn-danger mt-3"
          onClick={() => handleAddWatchList(movieData)}
          >
            Add to Watchlist
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieData;
