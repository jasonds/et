using System;

namespace et.domain.Models
{
    public class Product
    {
        public Product(Guid id)
            : this()
        {
            if (id == Guid.Empty) throw new ArgumentException(nameof(id));
            this.Id = id;
        }

        private Product()
        {
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid? LocationId { get; set; }

        public Location Location { get; set; }
    }
}
