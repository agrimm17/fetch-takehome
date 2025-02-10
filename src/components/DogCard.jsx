import { Box, Image, Text, Badge, Button } from '@chakra-ui/react';

const DogCard = ({ dog, addFav }) => {
  const { name, age, breed, image, id } = dog;
  // REVIEW THIS TO FIX STYLING
  return (
    <Box
      textAlign='center'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
    >
      <Image src={image} alt={`${name} the dog`} />
      <Box p='6'>
        <Badge borderRadius='full' px='2' colorScheme='teal'>
          {breed}
        </Badge>
        <Text mt='2' fontWeight='bold' fontSize='xl'>
          {name}
        </Text>
        <Text color='gray.500'>Age: {age}</Text>
        <Button borderRadius='7px' onClick={(e) => addFav(id)}>Save</Button>
      </Box>
    </Box>
  );
};

export default DogCard;
