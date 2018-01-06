using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using et.api.application.Contracts;
using et.api.domain.Repositories;
using et.domain.Models;

namespace et.api.application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            if (productRepository == null) throw new ArgumentNullException(nameof(productRepository));
            this._productRepository = productRepository;
        }

        public async Task<ICollection<Product>> GetAllAsync()
        {
            return await this._productRepository.GetAllAsync();
        }
    }
}
