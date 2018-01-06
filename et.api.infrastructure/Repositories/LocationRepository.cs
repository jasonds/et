using et.api.domain.Repositories;
using et.api.infrastructure.Data;
using et.domain.Models;

namespace et.api.infrastructure.Repositories
{
    public class LocationRepository : Repository<Location>, ILocationRepository
    {
        public LocationRepository(EtContext context)
            : base(context)
        {
        }
    }
}
