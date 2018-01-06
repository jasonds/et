using et.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace et.api.infrastructure.Data
{
    public class EtContext : DbContext
    {
        public EtContext(DbContextOptions<EtContext> options)
            : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Location)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.LocationId);
        }
    }
}
