import { Box, Button, Input, Heading, VStack } from '@chakra-ui/react';

const Login = () => (
  <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
    <Heading mb={6} textAlign="center"> Login</Heading>
    <VStack spacing={4}>
      <Input placeholder="Name"/>
      <Input placeholder="Email"/>
      <Button colorScheme="teal" width="full"> Log In</Button>
    </VStack>
  </Box>
);

export default Login;
