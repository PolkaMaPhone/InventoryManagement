import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';

interface AddItemFormProps {
    onSuccess: () => void;
}

const AddShelfForm: React.FC<AddItemFormProps> = ({ onSuccess }) => {
    const [description, setDescription] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/shelves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, label })
            });

            if (!response.ok) throw new Error("Failed to create the shelf.");

            const result = await response.json();
            // Use the result payload here
            console.log(result);

            toast({
                title: "Shelf Created",
                description: "A new shelf has been successfully created.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Optionally reset the form
            setDescription('');
            setLabel('');
            onSuccess();
            
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Failed to Create Shelf",
                    description: error.message || "Could not create shelf.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="label">Shelf Label</FormLabel>
                    <Input id="label" type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter shelf label" />
                    <FormLabel htmlFor="description">Shelf Description</FormLabel>
                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter shelf description" />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Add Shelf</Button>
            </form>
        </Box>
    );
};

export default AddShelfForm;
