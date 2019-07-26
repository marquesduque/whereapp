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
    public class qrcodeController : ApiController
    {
        private db db = new db();

        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postqrcode(string codigo, int pessoa_id)
        {
            foreach (var item in codigo.Split(','))
            {
                if (item.Split('_')[0] == "grupo")
                {
                    var gp = db.grupo_pessoa.Add(new grupo_pessoa()
                    {
                        grupo_id = Convert.ToInt32(item.Split('_')[1]),
                        pessoa_id = pessoa_id,
                        ativo = true,
                        convite = 0
                    });
                    db.SaveChanges();

                    var grupo = db.grupo.Where(c => c.id == gp.grupo_id).FirstOrDefault();

                    return Json(new {
                        id = grupo.id,
                        nome = grupo.nome,
                        descricao = grupo.descricao,
                        flag = "grupo"
                    });
                }
                else
                {
                    //pensar em como resolver aqui de um modo organico
                }
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

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}