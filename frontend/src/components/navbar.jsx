import { Text, Flex, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
// icons
import { IoPersonOutline, IoAddCircleOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";

const Navbar = () => {

  const username = 'fred'

  const nav = useNavigate()

  const handleNavigate = (route) => {
    nav(`/${route}`)
  }

  const handleNavigateUser = () => {
    const username = JSON.parse(localStorage.getItem('userData'))['username']
    nav(`/${username}`)
    window.location.reload()
  }


  return (
    <Flex w='100vw' h='90px' bg='blue.600' justifyContent='center' alignItems='center'>
        <HStack w='90%' justifyContent='space-between' color='white'>
          <Text fontSize='24px' fontWeight='bold'>khubby</Text>
          <HStack gap='20px'>
            <Text onClick={(route) => handleNavigate(`search/`)}><IoIosSearch size='20px'/></Text>
            <Text onClick={(route) => handleNavigate(``)}><FaHome size='20px'/></Text>
            <Text onClick={(route) => handleNavigate(`create/post/`)}><IoAddCircleOutline size='20px'/></Text>
            <Text onClick={handleNavigateUser}><IoPersonOutline size='20px'/></Text>
            <Text onClick={(route) => handleNavigate(`settings/`)}><MdOutlineSettings size='20px'/></Text>
          </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar