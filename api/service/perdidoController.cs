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
    public class perdidoController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Postperdido(int item_id, int flag)
        {
            var item = db.item.Find(item_id);
            if (flag == 0)
            {
                item.perdido = true;
            }
            else
            {
                item.perdido = false;
            }
            
            
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(item_id);
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