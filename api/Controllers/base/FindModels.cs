using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Site.Models
{
    public class Find<T>
    {
        public T Filter { get; set; }
        public List<T> Result { get; set; }
    }
}