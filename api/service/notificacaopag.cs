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
    public class notificacaopagController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
        }
        public class noticacao
        {
            public string notificationCode { get; set; }
            public string notificationType { get; set; }
        }
        // GET api/pessoas/5
        [HttpPost]
        public IHttpActionResult notificacao(noticacao n)//
        {
            Utility.Pagamento.pagseguro pag = new Utility.Pagamento.pagseguro();
            pag.notification(n.notificationCode);
            return Ok(0);
        }

        //List<pessoa> pessoa = new List<pessoa>();
        //if (Models.db.place.place_id.ToString() == password)
        //{
        //    pessoa = db.pessoa.Where(c => c.place_id == Models.db.place.place_id && c.password == email).ToList();
        //}
        //else
        //{
        //    pessoa = db.pessoa.Where(c => c.place_id == Models.db.place.place_id && c.email == email && c.password == password).ToList();
        //}

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