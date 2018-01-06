using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using et.api.application.Contracts;
using Microsoft.AspNetCore.Mvc;
using et.domain.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace et.api.Controllers
{
    [Route("api/products")]
    public class ProductsController : Controller
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            if (productService == null) throw new ArgumentNullException(nameof(productService));
            this._productService = productService;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ICollection<Product>> GetAll()
        {
            return await this._productService.GetAllAsync();
        }
    }
}
