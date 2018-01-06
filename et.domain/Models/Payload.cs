using System;

namespace et.domain.Models
{
    public class Payload
    {
        public Payload(Guid productId)
        {
            if (productId == Guid.Empty) throw new ArgumentException(nameof(productId));
            this.ProductId = productId;
        }

        public Guid ProductId { get; set; }

        public Direction Direction { get; set; }
    }
}
