import { Box, Image, Text, Badge } from '@chakra-ui/react';

const DogCard = ({ dog }) => {
    const { name, age, breed, image } = dog
    // REVIEW THIS TO FIX STYLING
    return (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
    <Image src={image} alt={`${name} the dog`} />
    <Box p="6">
      <Badge borderRadius="full" px="2" colorScheme="teal">{breed}</Badge>
      <Text mt="2" fontWeight="bold" fontSize="xl">{name}</Text>
      <Text color="gray.500">Age: {age}</Text>
    </Box>
  </Box>)
};

export default DogCard;
