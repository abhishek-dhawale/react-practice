import { useState, useEffect } from "react"
import { Container, Heading, Button, Grid, Avatar, Card, Image, Input, Group } from "@chakra-ui/react"
import axios from "axios"

function App() {
  // https://www.apirequest.in/movie/api

  //https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

  // http://www.omdbapi.com/?i=tt3896198&apikey=2eeb3e0b

  let [searchTitle, setSearchTitle] = useState("")
  let [movieData, setMovieData] = useState([])

  let getMovies = () => {
    let apiUrl;
    if(searchTitle === "") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
      // All data without search
      console.log("All data without search")
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchTitle}`
      // Data with search
      console.log("Data with search")
    }

    axios.get(apiUrl)
    .then((res) => res.data)
    .then((finalRes) => {
      console.log(apiUrl);
      setMovieData(finalRes.results);
      console.log(finalRes.results);
    })
  }

  useEffect(() => {
    getMovies()
  }, [searchTitle])

  return (
    <>
      <Heading size="4xl" textAlign="center" mt={8} mb={8}>Movie App</Heading>
      
      <Container maxW="container.xl" mx="auto" px={8}>
        <Group attached w="full" maxW="container.xl" py={8}>
          <Input flex="1" placeholder="Enter movie title" onChange={(e) => setSearchTitle(e.target.value)} />
        </Group>
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          {
            movieData.length >= 1 &&
            movieData.map((items, index) => {
              return(
                <MovieItems key={index} data={items} />
              )
            })

          }
          
        </Grid>
      </Container>
    </>
  )
}

export default App

function MovieItems({data}) {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2" display="flex" flexDirection="column" alignItems="center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.original_title}
          borderRadius="lg"
          boxSize="400px"
          objectFit="cover"
          mb={2}
        />
        <Card.Title mt="2">{data.original_title}</Card.Title>
        <Card.Description>
          {data.overview}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="center">
        <Button variant="outline" width="100%">View</Button>
      </Card.Footer>
    </Card.Root>
  )
}