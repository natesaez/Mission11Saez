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

        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1)
        {
            
            var something = _bookContext.Books
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalBooks = _bookContext.Books.Count();
            
            return Ok(new
            {
                Books = something,
                TotalBooks = totalBooks
            });
        }
    } 
}

