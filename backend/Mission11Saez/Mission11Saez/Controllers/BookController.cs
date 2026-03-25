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
    } 
}

