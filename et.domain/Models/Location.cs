using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace et.domain.Models
{
    public class Location
    {
        public Location(Guid id)
            : this()
        {
            if (id == Guid.Empty) throw new ArgumentException(nameof(id));
            this.Id = id;
        }

        private Location()
        {
            this.Products = new Collection<Product>();
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public ICollection<Product> Products { get; private set; }
    }
}
