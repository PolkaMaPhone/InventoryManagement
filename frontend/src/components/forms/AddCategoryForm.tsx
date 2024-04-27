import React, { useState, FormEvent } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
} from '@chakra-ui/react';

const AddCategoryForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const toast = useToast();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const categoryData = {
            name,
            description,
        };
        //logic to add a new category
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        });

        try {
            if (response.ok) {
                toast({
                    title: 'Category added successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Reset the form fields
                setName('');
                setDescription('');
            } else {
                toast({
                    title: 'Failed to add category',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
        console.log(name, description);
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel htmlFor="name">Name:</FormLabel>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                    required
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="description">Description:</FormLabel>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                    }
                />
            </FormControl>

            <Button type="submit">Add Category</Button>
        </Box>
    );
};

export default AddCategoryForm;
