import { useEffect, useState } from "react";
import type { Book } from '../types/Book';
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories}:{selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1);
    const [sortBy, setSortBy] = useState<string>('titleAsc');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


useEffect(() => {
    const loadBooks = async () => {
    try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortBy);
        setBooks(data.books);
        setTotalItems(data.totalBooks);
        console.log(data);
    } catch (error) {
        setError((error as Error).message);
    } finally {
        setLoading(false);
    }
    };

    loadBooks();
    
}, [pageSize, pageNum, sortBy, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            {books.map((b) =>
                <div id="projectCard" className="card" key={b.bookId}>
                    <div className="card mb-3 shadow-sm" style={{ width: '750px' }}>
                    <h3>{b.title}</h3>
                    <ul className ="list-unstyled">
                        <li className="card-text"><strong>Author: </strong> {b.author}</li>
                        <li className="card-text"><strong>Publisher: </strong> {b.publisher}</li>
                        <li className="card-text"><strong>ISBN: </strong> {b.isbn}</li>
                        <li className="card-text"><strong>Classification: </strong> {b.classification}</li>
                        <li className="card-text"><strong>Category: </strong> {b.category}</li>
                        <li className="card-text"><strong>Page Count: </strong> {b.pageCount}</li>
                        <li className="card-text"><strong>Price: </strong> ${b.price}</li>
                    </ul>

                    <button 
                    className="btn btn-success" 
                    onClick={() => 
                    navigate(`/cartconfirmation/${b.title}/${b.bookId}/${b.price}`)}
                    >Add to Cart</button>
                    </div>

                </div>
        
        )}
    <br />

    <p>totalItems: {totalItems}</p>
    <p>pageSize: {pageSize}</p>
    <p>totalPages: {totalPages}</p>

        <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
            }}
        />


    <br />
    <div className="text-center mt-3">
        <label className="me-2">Sort by title:</label>
        <select
            className="form-select d-inline w-auto"
            value={sortBy}
            onChange={(e) => {
            setSortBy(e.target.value);
            setPageNum(1);
            }}>
            <option value="titleAsc">A to Z</option>
            <option value="titleDesc">Z to A</option>
        </select>
    </div>

<br />
        </>
    );
}

export default BookList;