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
    public class cartaoController : ApiController
    {
        public db db = new db();

        // POST api/cartao
        [ResponseType(typeof(cartao))]
        public IHttpActionResult Getcartao(int pessoa_id)
        {
            return Ok(db.cartao.Where(c => c.pessoa_id == pessoa_id).OrderByDescending(c=>c.id).Take(1).FirstOrDefault());

        }

        // POST api/cartao
        [ResponseType(typeof(cartao))]
        public IHttpActionResult Postcartao(cartao cartaos)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (cartaos.expiracao.Split('/')[1].Length == 2) {
                    cartaos.expiracao = cartaos.expiracao.Split('/')[0] + "/20" + cartaos.expiracao.Split('/')[1];
                }
                
                var paggi = new Pagamento.paggi_novo(Models.db.place.token_paggi);

                cartaos.pagarme_id = paggi.cartao(cartaos, db);
                cartaos.cvv = null;

                if (cartaos.compra_id != null && cartaos.compra_id != 0)
                {

                    var compra = db.compra.Find(cartaos.compra_id);
                    compra.cartao.Add(cartaos);
                    paggi.compra(compra, null);

                    Models.db compradb = new Models.db();
                    var COMPRA = compradb.compra.Find(compra.id);
                    COMPRA.cartao_id = cartaos.id;
                    COMPRA.pagarme_id = compra.pagarme_id;
                    COMPRA.pagarme_status = compra.pagarme_status;
                    compradb.Entry(COMPRA).State = EntityState.Modified;
                    compradb.SaveChanges();
                }

                return CreatedAtRoute("DefaultApi", new
                {
                    id = cartaos.id
                }, cartaos);
            }
            catch (Exception ex)
            {
                return CreatedAtRoute("DefaultApi", new
                {
                    id = cartaos.id
                }, new { erro = "Ocorreu um erro, verifique se você digitou os dados do cartão corretamente."});
            }
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool cartaoExists(int id)
        {
            return db.cartao.Count(e => e.id == id) > 0;
        }
    }
}