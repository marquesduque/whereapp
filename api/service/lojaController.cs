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
    public class lojaController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                lojas = new List<loja>();
            }
            
            public List<loja> lojas { get; set; }

            public class loja
            {
                public loja()
                {
                    produtos = new List<produto>();
                }
                public int id { get; set; }
                public string nome { get; set; }
                public string foto { get; set; }
                public string foto_itype { get; set; }
                public int posicao { get; set; }
                public List<produto> produtos { get; set; }

                public class produto
                {
                    public int id { get; set; }
                    public string nome { get; set; }
                    public string descricao { get; set; }
                    public decimal valor { get; set; }
                    public int estoque { get; set; }
                    public string foto { get; set; }
                    public string foto_itype { get; set; }
                }
            }
            
        }

        public IHttpActionResult Getitem()
        {
            view v = new view();
            
            var loja = db.pessoa.Where(c => c.perfil_id == 2).ToList();

            foreach(var item in loja)
            {
                view.loja vLoja = new view.loja();

                vLoja.id = item.id;
                vLoja.nome = item.nome;
                vLoja.foto_itype = item.photo_itype == null ? "" : item.photo_itype;
                vLoja.foto = item.photo == null ? "" : System.Text.Encoding.UTF8.GetString(item.photo).Replace(" ", "+");
                vLoja.posicao = 1;

                //var produto = db.item.Where(c => c.responsavel_id == item.id).ToList();

                //foreach(var item1 in produto)
                //{
                //    view.loja.produto vProduto = new view.loja.produto();

                //    vProduto.id = item1.id;
                //    vProduto.nome = item1.nome;
                //    vProduto.descricao = item1.descricao;
                //    vProduto.valor = item1.valor.Value;
                //    vProduto.estoque = item1.estoque.Value;
                //    vProduto.foto_itype = item1.photo_itype == null ? "" : item1.photo_itype;
                //    vProduto.foto = item1.photo == null ? "" : System.Text.Encoding.UTF8.GetString(item1.photo).Replace(" ", "+");

                //    vLoja.produtos.Add(vProduto);
                //}

                v.lojas.Add(vLoja);
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