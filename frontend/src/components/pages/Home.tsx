import React, { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import AddItemForm from '../forms/AddItemForm';
import AddTubForm from '../forms/AddTubForm';
import AddShelfForm from '../forms/AddShelfForm';

const HomePage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [drawerContent, setDrawerContent] = useState<string | null>(null);

    const handleOpen = (content: string) => {
        setDrawerContent(content);
        onOpen();
    };

    const getDrawerContent = () => {
        switch (drawerContent) {
            case 'item':
                return <AddItemForm onSuccess={onClose} />;
            case 'tub':
                return <AddTubForm onSuccess={onClose}/>;
            case 'shelf':
                return <AddShelfForm onSuccess={onClose}/>;
            default:
                return <div>No content selected</div>;
        }
    };

    return (
        <div>
            <Button onClick={() => handleOpen('item')}>Add Item</Button>
            <Button onClick={() => handleOpen('tub')}>Add Tub</Button>
            <Button onClick={() => handleOpen('shelf')}>Add Shelf</Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>

                    <DrawerCloseButton />
                    <DrawerHeader>
                        Create New {drawerContent && drawerContent.charAt(0).toUpperCase() + drawerContent.slice(1)}
                    </DrawerHeader>
                    <DrawerBody>
                        {getDrawerContent()}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
export default HomePage;