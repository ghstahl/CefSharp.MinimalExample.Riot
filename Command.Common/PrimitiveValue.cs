using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Command.Common
{
    public class PrimitiveValue<T>
    {
        public PrimitiveValue(T value)
        {
            Value = value;
        }
        public T Value { get; set; }
    }
}
