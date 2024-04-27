import React, { useState, useEffect } from 'react';
import {
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
  Box
} from '@chakra-ui/react';

import { Item } from '../types/itemTypes';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const toast = useToast();
  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items/withCategory');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
      toast.promise(
        Promise.resolve(),
        {
          success: { title: 'Items fetched successfully', description: 'Great job!' },
          error: { title: 'Error fetching items', description: 'It broke.' },
          loading: { title: 'Fetching items', description: 'Please wait...' },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error fetching items',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // if the category_id is null, set the category name to "none"
  items.forEach(item => {
    if (item.category_id === null) {
      item.category = { category_id: 0, name: 'None', description: '' };
    }
  });

  const deleteItem = async (item_id: number) => {
    try {
      const response = await fetch(`/api/items/${item_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      setItems(items.filter(item => item.item_id !== item_id));
      toast({
        title: 'Item deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error deleting item',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Box p={5}>
      <Heading mb={4}>Items List</Heading>
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
    </Box>
  );
};

export default ItemList;
