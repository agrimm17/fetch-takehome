import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DogCard from './components/DogCard';
import { Box, SimpleGrid, Button, ButtonGroup } from '@chakra-ui/react';

// THIS IS A SAMPLE, REPLACE WITH API DATA
const dogs = [
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.1,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.2,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.3,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.4,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.5,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.6,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10',
    image: undefined,
    id: 1.7,
  },
  {
    name: 'Bartholemew',
    breed: 'Dachshund',
    age: '10.8',
    image: undefined,
    id: 1.8,
  },
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    image: undefined,
    id: 2,
  },
  {
    name: 'Max',
    breed: 'German Shepherd',
    age: 5,
    image: undefined,
    id: 3,
  },
  {
    name: 'Bella',
    breed: 'Labrador',
    age: 2,
    image: undefined,
    id: 4,
  },
];

// ADD Authorization FROM SUCCESSFUL LOGIN
// fetch('https://frontend-take-home-service.fetch.com/dogs/breed', {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: '',
//   },
// })
//   .then((resp) => {
//     if (!resp.ok) {
//       throw new Error('Problem with /dogs fetch response!');
//     }
//     return resp.json;
//   })
//   .then((data) => {
//     console.log('Found the Dogs!', data);
//     dogs = data;
//   })
//   .catch((err) => {
//     console.error('Caught an error!', err);
//   });

// BONUS: REVIEW THIS TO FIX STYLING

const App = () => {
  // BONUS: Investigate if this could be done in a more efficient way
  const [page, changePage] = useState(0);
  const [favs, editFavs] = useState([]);

  // BONUS: Add functionality to remove id if it's already in favs
  const addFav = (id) => {
    if (!favs.includes(id)) {
      editFavs([...favs, id]);
    }
  };
  // console.log(favs)

  let currDogs = dogs.slice(0 + 9 * page, 9 + 9 * page).map((dog) => {
    return <DogCard key={dog.id} dog={dog} addFav={addFav} />;
  });
  // console.log(page);

  // BONUS: Align these buttons
  let pageSelectors = [];
  for (let i = 0; i * 9 < dogs.length; i++) {
    pageSelectors.push(<Button onClick={(e) => changePage(i)}>{i + 1}</Button>);
  }

  return (
    <Box p={5}>
      <Login />
      {pageSelectors}
      <SimpleGrid columns={[1, 2, 3]} spacing={5} mt={10}>
        {currDogs}
        {/* {dogs.map((dog, i) => {
          return <DogCard key={dog.id} dog={dog} />;
        })} */}
      </SimpleGrid>
      {pageSelectors}
    </Box>
  );
};

export default App;
