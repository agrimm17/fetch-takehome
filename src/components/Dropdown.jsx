import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';

const Dropdown = ({ breedList, setSelectedBreed, selectedBreed}) => {

  const handleChange = (event) => {
    setSelectedBreed(event.target.value);
    // console.log('Selected breed:', event.target.value);
  };

//   const breeds = [
//     'Labrador Retriever',
//     'German Shepherd',
//     'Golden Retriever',
//     'French Bulldog',
//     'Bulldog',
//     'Poodle',
//     'Beagle',
//     'Rottweiler',
//     'German Shorthaired Pointer',
//     'Dachshund',
//   ];
//   console.log('Breedlist:', breedList);
  return (
    <select
      placeholder='Select a dog breed'
      onChange={handleChange}
      value={selectedBreed}
    >
      {breedList.map((breed, i) => (
        <option key={i} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;