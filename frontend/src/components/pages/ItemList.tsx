import React, { useState, useEffect, useRef } from 'react';
import { Item } from '../types/itemTypes';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Heading,
  useToast,
  Box,
  Spinner
} from '@chakra-ui/react';



const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const toast = useToast();
  const hasFetchedItems = useRef(false);

  const fetchItems = async () => {
    const response = await fetch('/api/items/withCategory');
    console.log("fetchItems : Fetching Items")
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchItemsPromise = fetchItems();
    console.log('useEffect : hasFetchedItems', hasFetchedItems.current);

    fetchItemsPromise.then((data) => {
      if (hasFetchedItems.current === false) {
        toast.promise(
          fetchItemsPromise,
          {
            success: { title: 'Items fetched successfully', description: `Great job!`, isClosable: true },
            error: { title: 'Error fetching items', description: `It broke.`, isClosable: true },
            loading: { title: 'Fetching items', description: `Please wait...`, duration: null, isClosable: false },
          }
        );
      }
      setItems(data);
      hasFetchedItems.current = true;
    });
  }, [toast]);

  const deleteItem = async (item_id: number) => {
    try {
      const response = await fetch(`/api/items/${item_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      setItems(items.filter(item => item.item_id !== item_id));
      await toast.promise(
        Promise.resolve(),
        {
          success: { title: 'Item deleted successfully', description: 'success', isClosable: true },
          error: { title: 'Error deleting item', description: 'error', isClosable: true },
          loading: { title: 'Deleting item', description: 'info', duration: null, isClosable: false },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: 'Error deleting item', description: error.message, status: 'error', isClosable: true });
      }
    }
  }

  return (
    <Box p={5}>
      <Heading mb={4}>Items List</Heading>
      <Text>Loading...</Text>
      {items.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(item => (
                <Tr key={item.item_id}>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.category.name}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => deleteItem(item.item_id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ItemList;
