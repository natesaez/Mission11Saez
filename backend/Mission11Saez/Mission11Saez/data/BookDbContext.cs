using Microsoft.EntityFrameworkCore;
using Mission11Saez.data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Book> Books { get; set; }
}