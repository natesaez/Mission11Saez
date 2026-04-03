using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Saez.data;

namespace Mission11Saez.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortBy = "titleAsc", [FromQuery] List<string>? categories = null)
        {
            
            var query = _bookContext.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }
            
            var totalBooks = query.Count();
            
            query = sortBy switch
            {
                "titleDesc" => query.OrderByDescending(b => b.Title),
                _ => query.OrderBy(b => b.Title)
            };

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalBooks = totalBooks
            });
        }

        [HttpGet("GetBookCategories")]
            public IActionResult GetBookCategories()
            {
                var bookCategories = _bookContext.Books
                    .Select(b => b.Category)
                    .Distinct()
                    .ToList();
                
                return Ok(bookCategories);
            }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _bookContext.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            
            return NoContent();
        }
    } 
}

