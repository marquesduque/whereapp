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
    public class comprasController : ApiController
    {
        private db db = new db();

        // GET api/pessoas/5
        [ResponseType(typeof(List<compra>))]
        public IHttpActionResult Getcompra(int? id)
        {
            var compra = db.compra.Where(c => c.place_id == Models.db.place.place_id && c.id == id).ToList();

            if (compra.Count() == 0)
            {
                return BadRequest("Não");
            }

            return Ok(compra);
        }

        [ResponseType(typeof(List<compra>))]
        public IHttpActionResult Getcompra(int? id, bool lst)
        {

            var compra = db.compra.Where(c => c.place_id == Models.db.place.place_id).OrderByDescending(c => c.id).ToList();

            if (compra.Count() == 0)
            {
                return BadRequest("Não");
            }

            return Ok(compra);
        }

        // POST api/pessoas
        [ResponseType(typeof(compra))]
        public IHttpActionResult Postcompra(int comprador_id, int vendedor_id, decimal total, bool delivery, bool balcao, string boleto_url, [FromUri] int[] item_id, [FromUri] int[] quantidade)
        {

            var compra = db.compra.Add(new compra
            {
                comprador_id = comprador_id,
                vendedor_id = vendedor_id,
                total = total,
                delivery = delivery,
                balcao = balcao,
                boleto_url = boleto_url,
                pagarme_status = 0
            });
            db.SaveChanges();

            for(var i = 0; i < item_id.Length; i++)
            {
                db.compra_item.Add(new compra_item
                {
                    item_id = item_id[i],
                    compra_id = compra.id,
                    quantidade = quantidade[i],
                    status = 0
                });
                db.SaveChanges();
            }
            
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