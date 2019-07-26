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
    public class lembrarController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
            
            
        }

        public IHttpActionResult Getitem(string email)
        {
            var usuario = db.pessoa.FirstOrDefault(c => c.email == email);

            if (usuario == null)
            {
                return Ok(0);
            }
            else
            {
                Utility.Email.SendEmail("naoresponda@creait.com.br", email, "Sua senha!", "Olá " + usuario.nome + ", sua senha é: " + usuario.password);
                return Ok(new { message = "A sua senha foi enviada no seu email!" });
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

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}