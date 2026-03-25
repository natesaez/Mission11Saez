import { useEffect, useState } from "react";
import type { Book } from './types/Book';

function BookList({selectedCategories}:{selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);

    const [pageSize, setPageSize] = useState<number>(10);

    const [pageNum, setPageNum] = useState<number>(1);

    const [totalItems, setTotalItems] = useState<number>(0);

    const totalPages = Math.ceil(totalItems / pageSize);

    const [sortBy, setSortBy] = useState<string>('titleAsc');

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories
            .map((cat) => `categories=${encodeURIComponent(cat)}`)
            .join('&');

            const response = await fetch(`https://localhost:5000/api/book?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalBooks)

        };
        fetchBooks();
    }, [pageSize, pageNum, sortBy, selectedCategories]);

    return (
        <>
            {books.map((b) =>
                <div id="projectCard" className="card" key={b.bookId}>
                    <h3>{b.title}</h3>
                    <div className="card-body">
                    <ul className ="list-unstyled">
                        <li><strong>Author:</strong> {b.author}</li>
                        <li><strong>Publisher:</strong> {b.publisher}</li>
                        <li><strong>ISBN:</strong> {b.isbn}</li>
                        <li><strong>Classification:</strong> {b.classification}</li>
                        <li><strong>Category:</strong> {b.category}</li>
                        <li><strong>Page Count:</strong> {b.pageCount}</li>
                        <li><strong>Price:</strong> {b.price}</li>
                    </ul>
                    </div>
                </div>
        
        )}
        <br />
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">

    <button
        className="btn btn-secondary"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
    >Previous</button>

    {[...Array(totalPages)].map((_, i) => (
        <button key={i + 1} className={`btn ${pageNum === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setPageNum(i + 1)} disabled={pageNum === i + 1}>
        {i + 1}</button>))}

    <button
        className="btn btn-secondary"
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}>Next</button>
</div>
<div className="text-center mt-3">
<label className="me-2">Results per page:</label>
<select
    className="form-select d-inline w-auto"
    value={pageSize}
    onChange={(p) => {
    setPageSize(Number(p.target.value));
    setPageNum(1);
    }}>
    <option value="1">1</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="20">20</option>
</select>
</div>

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