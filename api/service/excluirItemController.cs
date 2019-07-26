using api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace api
{
    public class excluirItemController : ApiController
    {
        private db db = new db();

        [HttpPost]
        public IHttpActionResult Postitem(int id)
        {
            var item = db.item.Find(id);

            item.ativo = false;

            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}