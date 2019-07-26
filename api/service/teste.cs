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
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace api
{
    [EnableCors(origins: "https://sandbox.pagseguro.uol.com.br", headers: "*", methods: "*")]
    public class testeController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
        }

        [HttpPost]
        public IHttpActionResult teste()//
        {
            //Utility.Pagamento.pagseguro pag = new Utility.Pagamento.pagseguro();
            //pag.assinatura();

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

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}