using System.Collections.Generic;
using System.Threading.Tasks;
using et.domain.Models;

namespace et.api.domain.Repositories
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetAllAsync();
    }
}
