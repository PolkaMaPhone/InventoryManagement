import React, { useState, useEffect, FormEvent } from 'react';
import { Category } from '../types/itemTypes';
import { FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';

const AddItemForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category_id, setCategoryId] = useState<number | ''>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const toast = useToast();

    useEffect(() => {
        // Fetch categories from the backend
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // Submit logic here
        try {
            const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, category_id })
            });

            if (response.ok) {
                // Item added successfully
                toast({
                    title: 'Item added successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Reset form fields
                setName('');
                setDescription('');
                setCategoryId('');
            } else {
                // Error adding item
                console.error('Error adding item:', response.statusText);
                toast({
                    title: 'Error adding item',
                    description: response.statusText,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding item:', error);
            if (error instanceof Error)
            toast({
                title: 'Error adding item',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        console.log({ name, description, category_id });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            </FormControl>
            <FormControl>
                <FormLabel>Select a Category</FormLabel>
                <Select value={category_id} onChange={e => setCategoryId(Number(e.target.value))} required>
                    <option value="">Select a Category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit">Add Item</Button>
        </form>
    );
}

export default AddItemForm;