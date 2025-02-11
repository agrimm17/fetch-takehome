import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  // FormLabel,
  // FormControl,
} from '@chakra-ui/react';
import { useState } from 'react';

// ADD API CALL
const Login = ({loadDogs, getBreeds}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // console.log(email, name);

  // const handleLogin = () => {
  //   console.log(email, name)
  // }
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Fetching Login Info!');
    fetch('https://frontend-take-home-service.fetch.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      credentials: 'include',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Problem with login fetch response!');
        }
        //This is broken - Don't know why (Should be resp.json())
        return resp.json;
      })
      .then((data) => {
        console.log('Login Successful', data);
        // loadDogs()
        getBreeds()
      })
      .catch((err) => {
        console.error('Caught an error!', err);
      });
  };

  return (
    <Box
      maxW='md'
      mx='auto'
      mt={10}
      p={5}
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='lg'
    >
      <Heading mb={6} textAlign='center'>
        {' '}
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          {/* <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel> */}
            <Input
              type='name'
              placeholder='Name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          {/* </FormControl>

          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel> */}
            <Input
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          {/* </FormControl> */}

          <Button backgroundColor='teal' width='full' type='submit'>
            {' '}
            Log In
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
