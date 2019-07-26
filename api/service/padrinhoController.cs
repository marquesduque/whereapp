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
    public class padrinhoController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                itens = new List<item>();
            }
            
            public List<item> itens { get; set; }

            public class item
            {
                public item()
                {
                    
                }
                public int id { get; set; }
                public string nome { get; set; }
                public string descricao { get; set; }
                public int responsavel_id { get; set; }
            }
            
        }

        public IHttpActionResult Getitem()
        {
            view v = new view();
            
            var padrinho = db.item.Where(c => c.apadrinhar == true).ToList();

            foreach(var i in padrinho)
            {
                view.item vItem = new view.item();

                vItem.id = i.id;
                vItem.nome = i.nome;
                vItem.descricao = i.descricao;
                vItem.responsavel_id = i.responsavel_id.Value;

                v.itens.Add(vItem);
            }
            
            return Ok(v);
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