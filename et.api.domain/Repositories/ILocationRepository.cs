using System.Collections.Generic;
using System.Threading.Tasks;
using et.domain.Models;

namespace et.api.domain.Repositories
{
    public interface ILocationRepository
    {
        Task<ICollection<Location>> GetAllAsync();
    }
}
