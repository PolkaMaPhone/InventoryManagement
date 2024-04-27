interface Category {
    category_id: number;
    name: string;
    description: string;
  }
  
  interface Item {
    item_id: number;
    name: string;
    description: string;
    category_id: number;
    category: Category;
  }

export type { Category, Item};