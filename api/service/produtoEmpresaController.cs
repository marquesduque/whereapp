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
    public class produtoEmpresaController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
            public int id { get; set; }
            public string nome { get; set; }
            public string descricao { get; set; }
            public decimal valor { get; set; }
            public int estoque { get; set; }
        }
        
        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postproduto(item item)
        {
            view v = new view();

            if(item.id == 0)
            {
                if(item.foto_str != null)
                {
                    item.photo = System.Text.Encoding.UTF8.GetBytes(item.foto_str.Replace(" ", "+")); ;
                    item.photo_itype = item.photo_itype;
                }
                db.item.Add(item);
                db.SaveChanges();

                v.id = item.id;
                v.nome= item.nome;
                v.descricao = item.descricao;
                v.valor = item.valor.Value;
                v.estoque = item.estoque == null ? 0 : item.estoque.Value;

                return Ok(v);
            }
            else
            {
                var i = db.item.Find(item.id);

                if (item.foto_str != null)
                {
                    item.photo = System.Text.Encoding.UTF8.GetBytes(item.foto_str.Replace(" ", "+")); ;
                    item.photo_itype = item.photo_itype;
                }

                i.nome = item.nome;
                i.descricao = item.descricao;
                i.valor = item.valor.Value;
                i.estoque = item.estoque == null ? 0 : item.estoque.Value;

                db.Entry(i).State = EntityState.Modified;
                db.SaveChanges();

                v.id = item.id;
                v.nome = item.nome;
                v.descricao = item.descricao;
                v.valor = item.valor.Value;
                v.estoque = item.estoque == null ? 0 : item.estoque.Value;

                return Ok(v);
            }
        }
        // DELETE api/pessoas/5
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Deletepessoa(int id)
        {
            pessoa pessoa = db.pessoa.Find(id);
            if (pessoa == null)
            {
                return NotFound();
            }

            db.pessoa.Remove(pessoa);
            db.SaveChanges();

            return Ok(pessoa);
        }


        [HttpGet]
        [System.Web.Mvc.OutputCache(Duration = 100000, VaryByParam = "none")]
        public HttpResponseMessage GetFoto(int pessoa_id)
        {

            try
            {
                var foto = db.pessoa.Find(pessoa_id).photo;
                if (foto != null)
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                    response.Content = new ByteArrayContent(foto);
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                    response.Headers.CacheControl = new CacheControlHeaderValue()
                    {
                        Public = true,
                        MaxAge = new TimeSpan(1, 0, 0, 0)
                    };
                    return response;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
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