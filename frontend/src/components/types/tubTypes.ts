interface Shelf {
    shelf_id: number;
    description: string;
}

interface TubFormData {
    label: string;
    shelf_id: number;
}

export type { Shelf, TubFormData };