import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import ItemList from './components/pages/ItemList';
import AddCategoryForm from './components/forms/AddCategoryForm';
import AddItemForm from './components/forms/AddItemForm';
import AddTubForm from './components/forms/AddTubForm';
import AddShelfForm from './components/forms/AddShelfForm';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme';

function App(): JSX.Element {
    return (
        <ChakraProvider theme={customTheme}>
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/items">Item List</Link>
                        </li>
                        <li>
                            <Link to="/add-category">Add Category</Link>
                        </li>
                        <li>
                            <Link to="/add-item">Add Item</Link>
                        </li>
                        <li>
                            <Link to="/add-tub">Add Tub</Link>
                        </li>
                        <li>
                            <Link to="/add-shelf">Add Shelf</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/items" element={<ItemList />} />
                    <Route path="/add-category" element={<AddCategoryForm />} />
                    <Route path="/add-item" element={<AddItemForm />} />
                    <Route path="/add-tub" element={<AddTubForm />} />
                    <Route path="/add-shelf" element={<AddShelfForm />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
        </ChakraProvider>
    );
}

export default App;
