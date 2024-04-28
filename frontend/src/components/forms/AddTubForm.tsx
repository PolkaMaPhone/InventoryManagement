import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import { Shelf, TubFormData } from '../types/tubTypes';

interface AddItemFormProps {
    onSuccess: () => void;
}

const AddTubForm: React.FC<AddItemFormProps> = ({ onSuccess }) => {

    const [shelves, setShelves] = useState<Shelf[]>([]);
    const [formData, setFormData] = useState<TubFormData>({ label: '', shelf_id: 0 });
    const toast = useToast();

    useEffect(() => {
        fetch('/api/shelves')
            .then(response => response.json())
            .then(data => setShelves(data))
            .catch(error => console.error('Error fetching shelves:', error));
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData.shelf_id) {
            toast({
                title: "Error",
                description: "You must select a shelf",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        fetch('/api/tubs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                toast({
                    title: "Tub created successfully",
                    description: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setFormData({ label: '', shelf_id: 0 }); // Reset form
                onSuccess();
            })
            .catch(error => {
                toast({
                    title: "Error creating tub",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="shelf_id">Shelf</FormLabel>
                    <Select id="shelf_id" name="shelf_id" placeholder="Select shelf" onChange={handleChange} value={formData.shelf_id}>
                        {shelves.map((shelf: Shelf) => (
                            <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.description}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="label">Label</FormLabel>
                    <Input id="label" name="label" type="text" value={formData.label} onChange={handleChange} placeholder="Enter tub label" />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Add Tub</Button>
            </form>
        </Box>
    );
};

export default AddTubForm;