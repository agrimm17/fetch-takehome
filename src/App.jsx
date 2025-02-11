import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import DogCard from './components/DogCard';
import { Box, SimpleGrid, Button, ButtonGroup } from '@chakra-ui/react';

// THIS IS A SAMPLE, REPLACE WITH API DATA
// let dogs = [
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.1,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.2,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.3,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.4,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.5,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.6,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10',
//     image: undefined,
//     id: 1.7,
//   },
//   {
//     name: 'Bartholemew',
//     breed: 'Dachshund',
//     age: '10.8',
//     image: undefined,
//     id: 1.8,
//   },
//   {
//     name: 'Buddy',
//     breed: 'Golden Retriever',
//     age: 3,
//     image: undefined,
//     id: 2,
//   },
//   {
//     name: 'Max',
//     breed: 'German Shepherd',
//     age: 5,
//     image: undefined,
//     id: 3,
//   },
//   {
//     name: 'Bella',
//     breed: 'Labrador',
//     age: 2,
//     image: undefined,
//     id: 4,
//   },
// ];
let dogs = [];
// let currDogs = [];
let breedList = [];
let next = undefined;
let prev = undefined;
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
  const [page, changePage] = useState(0);
  const [favs, editFavs] = useState([]);
  const [currDogs, changeCurrDogs] = useState([]);
  const [pageButtons, updatePageButtons] = useState({
    next: undefined,
    prev: undefined,
  });

  // useEffect(() => {
  //   changeCurrDogs(
  //     dogs.slice(0 + 25 * page, 25 + 25 * page).map((dog) => {
  //       return <DogCard key={dog.id} dog={dog} addFav={addFav} />;
  //     })
  //   );
  // }, [page]);

  // BONUS: Add functionality to remove id if it's already in favs
  const addFav = (id) => {
    if (!favs.includes(id)) {
      editFavs([...favs, id]);
    }
  };
  // console.log(favs);

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
        loadDogs();
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  // Bonus: Update this to load more efficiently
  const loadDogs = (
    query = '/dogs/search?breeds=Affenpinscher',
    i = breedCount
  ) => {
    console.log('Attempting to Get Dogs', query);
    fetch(`https://frontend-take-home-service.fetch.com${query}`, {
      // console.log('target breed:', breedList, breedList[i])
      // fetch(
      // `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breedList[i]}query`,
      // {
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
          console.log('ding!');
          loadDogs(`/dogs/search?breeds=${breedList[i + 1]}`, i + 1);
        } else {
          displayDogs(data.resultIds);
          next = data.next;
          prev = data.prev;
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
        changeCurrDogs(
          data.map((dog) => {
            return <DogCard key={dog.id} dog={dog} addFav={addFav} />;
          })
        );
        console.log('updating currDog state!', currDogs);
        // console.log('Found the Dogs!', data);
        // dogs.push(...data);
        // dogs = dogs.sort((a, b) => a.breed.localeCompare(b.breed))
        // changeCurrDogs(
        //   dogs.slice(0, 25).map((dog) => {
        //     return <DogCard key={dog.id} dog={dog} addFav={addFav} />;
        //   })
        // );
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  // let currDogs = dogs.slice(0 + 9 * page, 9 + 9 * page).map((dog) => {
  //   return <DogCard key={dog.id} dog={dog} addFav={addFav} />;
  // });
  // console.log(page);

  // BONUS: Align these buttons
  let pageSelectors = [];
  for (let i = 0; i * 25 < dogs.length; i++) {
    pageSelectors.push(<Button onClick={(e) => changePage(i)}>{i + 1}</Button>);
  }

  // Store current page next/prev strings
  // create buttons that call loadDogs(next/prev)
  let nextPrev = [
    <Button onClick={(e) => loadDogs(prev)}>Prev</Button>,
    <Button onClick={(e) => loadDogs(next)}>Next</Button>,
  ];

  return (
    <Box p={5}>
      <Login loadDogs={loadDogs} getBreeds={getBreeds} />
      {/* {pageSelectors} */}
      {nextPrev}
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={5} mt={10}>
        {currDogs}
        {/* {dogs.map((dog, i) => {
          return <DogCard key={dog.id} dog={dog} />;
        })} */}
      </SimpleGrid>
      {/* {pageSelectors} */}
    </Box>
  );
};

export default App;
