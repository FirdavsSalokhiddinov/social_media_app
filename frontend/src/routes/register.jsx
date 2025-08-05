import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { register } from "../api/endpoints";
import { useNavigate } from "react-router-dom";



const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try{
                const response = await register(username, email, firstName, lastName, password);
                alert('successful registration')
                navigate('/login')
                
            } catch {
                alert('error registering');
            }
        } else {
            alert('password & confirm password are not identical!')
        }
    }

    const handleNav = () => {
        navigate('/login')
    }


  return (
    <Flex w='100%' h='calc(100vh - 90px)' justifyContent='center' alignItems='center'>
        <VStack alignItems='start' w='95%' maxW='400px' gap='10px'>
            <Heading>Register</Heading>
            <FormControl>
                <FormLabel htmlFor='username' >Username</FormLabel>
                <Input onChange={(e) => setUsername(e.target.value)} type='text' bg='white' />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='email' >Email</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} type='email' bg='white' />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='firstName' >First Name</FormLabel>
                <Input onChange={(e) => setFirstName(e.target.value)} type='text' bg='white' />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='lastName' >Last Name</FormLabel>
                <Input onChange={(e) => setLastName(e.target.value)} type='text' bg='white' />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password' >Password</FormLabel>
                <Input onChange={(e) => setPassword(e.target.value)} type='password' bg='white' />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='confirmPassword' >Confirm Password</FormLabel>
                <Input onChange={(e) => setConfirmPassword(e.target.value)} type='password' bg='white' />
            </FormControl>
            <VStack w='100%' alignItems='start'>
                <Button onClick={handleRegister} w='100%' colorScheme="green" fontSize='18px'>Register</Button>
                <Text onClick={handleNav}>Already have an account? Log in</Text>
            </VStack>
        </VStack>
    </Flex>
  )
}

export default Register