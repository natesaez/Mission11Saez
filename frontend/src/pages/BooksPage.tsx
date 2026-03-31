import CategoryFilter from "../components/BookFilter";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";
import WelcomeBand from "../components/WelcomeBand";
import { useState } from "react";

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return (
        <div className='containter mt-4'>
            <CartSummary />
            <WelcomeBand />
            <div className='row'>
                <div className='col-md-3'>
                <CategoryFilter selectedCategories= {selectedCategories} setSelectedCategories={setSelectedCategories}/>
                </div>
                <div className='col-md-3'>
                <BookList selectedCategories={selectedCategories}/>
                </div>
            </div>
        </div>
    );
}

export default BooksPage;