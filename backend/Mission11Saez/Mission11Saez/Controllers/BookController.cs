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

        public IEnumerable<Book> GetBooks()
        {
            
            var something = _bookContext.Books
                .Take(5)
                .ToList();
            return something;
        }
    } 
}

