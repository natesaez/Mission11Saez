import type { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalBooks: number;

}

const API_BASE_URL = 'https://booklist-saez-backend-eefwdtfrcng7abgb.westus2-01.azurewebsites.net/api';

export const fetchBooks = async(
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortBy: string

): Promise<FetchBooksResponse> => {

    try{
        const categoryParams = selectedCategories
    .map((cat) => `categories=${encodeURIComponent(cat)}`)
    .join('&');

    const response = await fetch(
        `${API_BASE_URL}/book?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

if (!response.ok) {
    throw new Error('Failed to fetch books');
}

    return await response.json();
    }
    catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }

};

export const AddBook = async (newBook: Book): Promise<Book> => {
    try{
        const response = await fetch(`${API_BASE_URL}/book/AddBook?`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/book/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};


export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/book/DeleteBook/${bookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};