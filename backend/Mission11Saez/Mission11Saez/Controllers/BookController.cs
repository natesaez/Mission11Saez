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
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortBy = "titleAsc")
        {
            var query = _bookContext.Books.AsQueryable();

            query = sortBy switch
            {
                "titleDesc" => query.OrderByDescending(b => b.Title),
                _ => query.OrderBy(b => b.Title)
            };

            var totalBooks = query.Count();

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
    } 
}

