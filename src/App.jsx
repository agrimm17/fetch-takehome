import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DogCard from './components/DogCard';
import Dropdown from './components/Dropdown';
import { Box, SimpleGrid, Button } from '@chakra-ui/react';

let breedList = [];
let breedCount = 0;
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
  const [favs, editFavs] = useState([]);

  useEffect(() => {
    console.log('favs updated useEffect:', favs);
  }, [favs]);

  const [currDogs, changeCurrDogs] = useState([]);
  const [pageButtons, updatePageButtons] = useState({
    next: undefined,
    prev: undefined,
  });
  const [selectedBreed, setSelectedBreed] = useState('');

  // BUG: Fix this so that when filtering by breed, you cannot see other breeds. Requires intense tinkering in getIds()
  useEffect(() => {
    console.log('Selected Breed:', selectedBreed);
    if (selectedBreed) {
      console.log('sorting by breed:', selectedBreed);
      getIds(`/dogs/search?breeds=${selectedBreed}`);
    }
  }, [selectedBreed]);

  // BONUS: Add functionality to remove id if it's already in favs
  const addFav = (id) => {
    editFavs((prevFavs) => {
      if (!prevFavs.includes(id)) {
        // console.log('Previous Favs:', prevFavs);
        // console.log(`Adding ${id}`);
        return [...prevFavs, id];
      } else {
        // console.log(`${id} is already in favorites`);
      }
      return prevFavs;
    });
  };

  const getBreeds = () => {
    console.log('Attempting to Get Breed List');
    fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Problem with /breeds fetch response!');
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Found the breeds!', data);
        breedList = data;
        getIds();
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  // Bonus: Update this to load more efficiently
  const getIds = (
    query = '/dogs/search?breeds=Affenpinscher',
    i = breedCount
  ) => {
    console.log('Attempting to Get Dogs', query);
    fetch(`https://frontend-take-home-service.fetch.com${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Problem with /dogs/search fetch response!');
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Found the IDs!', data.resultIds);
        if (!data.resultIds[0]) {
          console.log('Next Breed!', breedList[i + 1]);
          getIds(`/dogs/search?breeds=${breedList[i + 1]}`, i + 1);
        } else {
          displayDogs(data.resultIds);
          // Bug: This fails to update prev when shifting to a new breed
          updatePageButtons({
            next: data.next,
            prev: data.prev,
          });

          // Minor Bug: These log one iteration late
          console.log('pagenext', pageButtons.next);
          console.log('pageprev', pageButtons.prev);
          // next = data.next;
          // prev = data.prev;
          // console.log(prev)
          breedCount = i;
        }
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  const displayDogs = (dogIds) => {
    fetch('https://frontend-take-home-service.fetch.com/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dogIds),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Problem with /dogs post response!');
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Fav Dog Selected and returned:', data)
        changeCurrDogs(
          data.map((dog) => {
            // console.log('making new dog', dog.id);
            return <DogCard key={dog.id} dog={dog} addFav={addFav} favs={favs} />;
          })
        );
        console.log('updating currDog state!', currDogs);
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  const generateMatch = () => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(favs),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Problem with /dogs/match post response!');
        }
        return resp.json();
      })
      .then((data) => {
        finalMatch = data;
        displayDogs([data.match])
        console.log('Providing a match!', data);
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };
  // BONUS: Align these buttons

  // Store current page next/prev strings
  // create buttons that call getIds(next/prev)
  let finalMatch = undefined;
  let matchDisplay = undefined;
  let nextPrev = undefined;
  let dropdown = undefined;
  let login = <Login getIds={getIds} getBreeds={getBreeds} />;
  if (breedList[0]) {
    dropdown = (
      <Dropdown
        breedList={breedList}
        setSelectedBreed={setSelectedBreed}
        selectedBreed={selectedBreed}
      />
    );
    nextPrev = [
      <Button onClick={(e) => getIds(pageButtons.prev)}>Prev</Button>,
      <Button onClick={(e) => getIds(pageButtons.next)}>Next</Button>,
      <Button onClick={(e) => generateMatch()}>generate match</Button>,
    ];
    login = undefined;
  }

  if (finalMatch) {
    
  }

  return (
    <Box p={5}>
      {matchDisplay}
      {login}
      {dropdown}
      {nextPrev}
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={5} mt={10}>
        {currDogs}
        {/* {dogs.map((dog, i) => {
          return <DogCard key={dog.id} dog={dog} />;
        })} */}
      </SimpleGrid>
    </Box>
  );
};

export default App;
