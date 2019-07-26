

namespace api.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Web;
    using System.Collections.Generic;

    public partial class db : ec2
    {

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public static place place
        {
            get
            {
                return new place() {
                    place_id = 1
                };
            }
        }
        public db()
        {
            this.Configuration.LazyLoadingEnabled = false;

        }


    }

}