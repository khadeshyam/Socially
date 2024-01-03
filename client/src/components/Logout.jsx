import React, { useRef, useState,useContext } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { AuthContext } from '../context/authContext'; 
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { HStack, IconButton, Text} from '@chakra-ui/react';

const Logout = () => {
  const { logout } = useContext(AuthContext); // Assuming you have a logout function in your AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <>
      <HStack w="100%" p={2} _hover={{ bg: 'gray.100' }} borderRadius="8px" onClick={() => setIsOpen(true)} cursor="pointer">
            <IconButton icon={<PowerSettingsNewIcon />} aria-label="Menu" background="transparent" _hover={{ bg: 'transparent' }} />
            <Text fontSize="sm" fontWeight="bold" ml={2}>Logout</Text>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogoutClick} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Logout;