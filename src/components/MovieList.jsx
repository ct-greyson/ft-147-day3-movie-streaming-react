import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../features/wishListSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MovieList = ({ listType }) => {
  const [movieList, setMovieList] = useState([]);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [id, setId] = useState(null);

  // useSelector allows us to grab the current global state for whatever state we are keeping track of
  // "select" the state we need from redux
  // in this case, we need the wishList property from our wishList state
  const { wishList } = useSelector((state) => state.wishList);
  const { watchList } = useSelector((state) => state.watchList);

  useEffect(() => {
    if (listType === "watch") {
      setMovieList(watchList);
    } else {
      setMovieList(wishList);
    }
  }, [watchList, wishList]);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // delete only available on wishList
    // would require a delete endpoint for our watchlist to modify the data in our database
    if (listType === "wish") {
      dispatch(deleteItem(id));
    }
  };

  const postReview = async () => {
    // update a movie in our watchlist with a review.  we select that movie by id.
    const response = await axios.put(
      `http://127.0.0.1:5000/watchlist/${id}`,
      { review },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: postReview,
    onSuccess: async (data) => {

      // refresh our movieList state to display our updated review
      const responseGet = await axios.get(`http://127.0.0.1:5000/watchlist`);
      setMovieList(responseGet.data);
      
      alert(`Successfully added review to: movie: ${id}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
    setOpen(false);
  };

  return (
    <Container fluid>
      <NavBar />
      <Row className="p-3">
        {movieList.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={6} lg={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={movie.poster_path} />
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                {movie.review ||
                  (listType === "watch" && (
                    <div>
                      <Card.Text>Review: {movie.review}</Card.Text>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setId(movie.id);
                        }}
                      >
                        Add Review
                      </Button>
                    </div>
                  ))}

                <Button onClick={() => handleDelete(movie.id)} variant="danger">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={open}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="w-100 p-4" onSubmit={handleSubmit}>
            <FloatingLabel controlId="Review" label="Review">
              <Form.Control
                autoComplete="off"
                type="text"
                placeholder="Review"
                onChange={(event) => setReview(event.target.value)}
              />
            </FloatingLabel>
            <Button variant="outline-info" type="submit" className="mt-4">
              Submit
            </Button>
            <Button
              className="ms-3 mt-4"
              variant="danger"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieList;
