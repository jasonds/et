using System.Collections.Generic;
using System.Threading.Tasks;
using et.domain.Models;

namespace et.api.application.Contracts
{
    public interface ILocationService
    {
        Task<ICollection<Location>> GetAllAsync();
    }
}
