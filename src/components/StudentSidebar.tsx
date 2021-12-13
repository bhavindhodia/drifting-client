import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import {
  Drawer,
  DrawerBody,
  IconButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

function StudentSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        aria-label="Menu"
        ref={btnRef.current}
        icon={<RiMenu2Line />}
        colorScheme="primary"
        onClick={onOpen}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Text>Logout</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default StudentSidebar;
