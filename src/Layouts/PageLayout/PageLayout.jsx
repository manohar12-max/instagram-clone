import React from 'react'
import {Flex ,Box,Spinner}  from '@chakra-ui/react'
import Sidebar from "../../components/Sidebar/Sidebar"
import {useLocation} from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../FireBase/firebase"
import Navbar from '../../components/Navbar/Navbar'
const PageLayout = ({children}) => {
  const {pathname} = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar=pathname !=="/auth"  && user; //show sidebar only if path is not /auth and user is logged in
  const canRenderNavbar= !user && !loading && pathname !=="/auth"

  const checkingIfUserIsAuth=!user && loading;
  if(checkingIfUserIsAuth){
    return <PageLayoutSpinner/>
  }

  return (
    <Flex direction={canRenderNavbar ? "column" :"row"} >
        {/* side bar on the left */}
        {canRenderSidebar ? (<Box w={{base:"70px",md:"240px"}}>
            <Sidebar/>
        </Box>) :null  }
        {/* navbar */}
        {canRenderNavbar ? (<Navbar/>):null}
         {/* content bar on the right */}
         <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
				{children}
			</Box>
    </Flex>
  )
}

export default PageLayout


const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};