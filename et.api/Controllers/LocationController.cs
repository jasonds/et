using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using et.api.application.Contracts;
using Microsoft.AspNetCore.Mvc;
using et.domain.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace et.api.Controllers
{
    [Route("api/locations")]
    public class LocationController : Controller
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            if (locationService == null) throw new ArgumentNullException(nameof(locationService));
            this._locationService = locationService;
        }

        // GET: api/locations
        [HttpGet]
        public async Task<ICollection<Location>> GetAll()
        {
            return await this._locationService.GetAllAsync();
        }
    }
}
