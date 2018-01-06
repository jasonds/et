using et.api.domain.Repositories;
using et.api.infrastructure.Data;
using et.domain.Models;

namespace et.api.infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(EtContext context)
            : base(context)
        {
        }
    }
}
