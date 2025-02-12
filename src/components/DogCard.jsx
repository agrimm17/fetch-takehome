import { Box, Image, Text, Badge, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const DogCard = ({ dog, addFav, favs }) => {
  const { name, age, breed, img, id } = dog;
  const [isFav, adjustFav] = useState(false);

  // BONUS BUG: This isn't working for some reason
  useEffect(() => {
    console.log('Adjusting isFav', favs, id)
    if (favs.includes(id)) {
      adjustFav(true);
    } else adjustFav(false);
  }, [favs]);

  // BONUS: REVIEW THIS TO FIX STYLING
  return (
    <Box
      textAlign='center'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
    >
      {/* IMAGE NOT DISPLAYING PROPERLY */}
      <Image
        src={img}
        alt={`${name} the dog`}
        height='200px'
        width='100%'
        objectFit='cover'
      />
      <Box p='6'>
        <Badge borderRadius='full' px='2' colorScheme='teal'>
          {breed}
        </Badge>
        <Text mt='2' fontWeight='bold' fontSize='xl'>
          {name}
        </Text>
        <Text color='gray.500'>Age: {age}</Text>
        <Button
          borderRadius='7px'
          onClick={(e) => addFav(id)}
          backgroundColor={isFav ? 'green' : 'white'}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default DogCard;
