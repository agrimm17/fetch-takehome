import React, { Component } from 'react';
import Login from './components/Login';
import DogCard from './components/DogCard';
import { Box, SimpleGrid } from '@chakra-ui/react';

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

// REVIEW THIS TO FIX STYLING
const App = () => {
  return (
    <Box p={5}>
      <Login />
      <SimpleGrid columns={[1, 2, 3]} spacing={5} mt={10}>
        {dogs.map((dog, i) => {
          return <DogCard key={dog.id} dog={dog} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default App;
