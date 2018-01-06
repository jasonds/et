using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace et.api.infrastructure.Repositories
{
    public abstract class Repository<TEntity>
        where TEntity : class
    {
        private readonly DbContext _dbContext;

        protected Repository(DbContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));
            this._dbContext = context;
        }

        protected virtual IQueryable<TEntity> Set => this._dbContext.Set<TEntity>();

        public async Task<ICollection<TEntity>> GetAllAsync()
        {
            return await this.Set.ToListAsync();
        }
    }
}
