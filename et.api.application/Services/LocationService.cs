using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using et.api.application.Contracts;
using et.api.domain.Repositories;
using et.domain.Models;

namespace et.api.application.Services
{public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            if (locationRepository == null) throw new ArgumentNullException(nameof(locationRepository));
            this._locationRepository = locationRepository;
        }

        public async Task<ICollection<Location>> GetAllAsync()
        {
            return await this._locationRepository.GetAllAsync();
        }
    }
}
