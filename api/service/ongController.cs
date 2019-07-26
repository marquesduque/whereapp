using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using api.Models;

namespace api
{
    public class ongController : ApiController
    {
        private db db = new db();
        
        // POST api/pessoas
        [ResponseType(typeof(compra))]
        public IHttpActionResult Postcompra(int comprador_id, int vendedor_id, decimal total, bool delivery, bool balcao)
        {

            var compra = db.compra.Add(new compra
            {
                comprador_id = comprador_id,
                vendedor_id = vendedor_id,
                total = total,
                delivery = delivery,
                balcao = balcao
            });
            db.SaveChanges();

            return Ok(0);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool compraExists(int id)
        {
            return db.compra.Count(e => e.id == id) > 0;
        }
    }
}