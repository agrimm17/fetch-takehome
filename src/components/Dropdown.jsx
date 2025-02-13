import React from 'react';

const Dropdown = ({ breedList, setSelectedBreed, selectedBreed }) => {
  const handleChange = (event) => {
    setSelectedBreed(event.target.value);
  };

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
