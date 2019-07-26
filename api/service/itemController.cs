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
    public class itemController : ApiController
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
                public int id { get; set; }
                public int tipo { get; set; }
                public string nome { get; set; }
                public string cor { get; set; }
                public string raca { get; set; }
                public string foto { get; set; }
                public string foto_itype { get; set; }
                public string nascimento { get; set; }
                public int responsavel_id { get; set; }
                public decimal valor { get; set; }
                public decimal estoque { get; set; }
                public string descricao { get; set; }
                public int perdido { get; set; }
                public int rastreador { get; set; }
                public string fabricante { get; set; }
                public string marca { get; set; }
                public string num_serie { get; set; }
                public string modelo { get; set; }
            }
        }

        public IHttpActionResult Getitem(int responsavel_id)
        {
            view v = new view();

            var i = db.item.Where(c => c.responsavel_id == responsavel_id).ToList();

            foreach (var item in i)
            {
                view.item vItem = new view.item();

                vItem.id = item.id;
                vItem.tipo = item.tipo_id == null ? 0 : item.tipo_id.Value;
                vItem.nome = item.nome;
                vItem.cor = item.cor;
                vItem.raca = item.raca;
                //vItem.foto = item.photo == null ? "" : System.Text.Encoding.UTF8.GetString(item.photo).Replace(" ", "+"); ;
                //vItem.foto_itype = item.photo_itype == null ? "" : item.photo_itype; ;
                vItem.nascimento = item.nascimento == null ? "" : item.nascimento.Value.ToString("dd/MM/yyyy"); ;
                vItem.responsavel_id = item.responsavel_id == null ? 0 : item.responsavel_id.Value; ;
                vItem.valor = item.valor == null ? 0 : item.valor.Value;
                vItem.estoque = item.estoque == null ? 0 : item.estoque.Value;
                vItem.descricao = item.descricao;
                vItem.perdido = item.perdido == true ? 1 : 0;
                vItem.rastreador = db.rastreador.Where(c => c.item_id == item.id).FirstOrDefault() == null ? 0 : 1;

                v.itens.Add(vItem);
            }
            return Ok(v);
        }

        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postitem(item item)
        {
            if(item.id == 0)
            {
                db.item.Add(item);
                db.SaveChanges();
            }
            else
            {
                var i = db.item.Find(item.id);
                if (item.foto_str != null)
                {
                    item.photo = System.Text.Encoding.UTF8.GetBytes(item.foto_str.Replace(" ", "+"));
                }

                i.id = item.id;
                i.tipo_id = item.tipo_id.Value;
                i.nome = item.nome;
                i.cor = item.cor;
                i.raca = item.raca;
                i.photo_itype = "data:image/jpeg;base64";
                i.nascimento = item.nascimento;
                i.responsavel_id = item.responsavel_id == null ? 0 : item.responsavel_id.Value; ;
                i.valor = item.valor == null ? 0 : item.valor.Value;
                i.descricao = item.descricao;
                i.perdido = item.perdido;
                i.fabricante = item.fabricante;
                i.marca = item.marca;
                i.modelo = item.modelo;
                i.num_serie = item.num_serie;

                db.Entry(i).State = EntityState.Modified;
                db.SaveChanges();
            }
            

            view v = new view();

            view.item vItem = new view.item();
            vItem.id = item.id;
            vItem.tipo = item.tipo_id == null ? 0 : item.tipo_id.Value;
            vItem.nome = item.nome;
            vItem.cor = item.cor;
            vItem.raca = item.raca;
            vItem.foto = item.photo == null ? "" : System.Text.Encoding.UTF8.GetString(item.photo).Replace(" ", "+"); ;
            vItem.foto_itype = item.photo_itype == null ? "" : item.photo_itype; ;
            vItem.nascimento = item.nascimento == null ? "" : item.nascimento.Value.ToString("dd/MM/yyyy"); ;
            vItem.responsavel_id = item.responsavel_id == null ? 0 : item.responsavel_id.Value; ;
            vItem.valor = item.valor == null ? 0 : item.valor.Value;
            vItem.descricao = item.descricao;
            vItem.perdido = item.perdido == true ? 1 : 0;
            vItem.rastreador = db.rastreador.Where(c => c.item_id == item.id).FirstOrDefault() == null ? 0 : 1;
            vItem.fabricante = item.fabricante;
            vItem.marca = item.marca;
            vItem.modelo = item.modelo;
            vItem.num_serie = item.num_serie;

            v.itens.Add(vItem);

            return Ok(v);
        }

        public IHttpActionResult Postitemgrupo(int grupo_id, [FromUri] int[] item_id)
        {
            view v = new view();

            foreach(var item in item_id) {
                if(db.grupo_item.Where(c => c.grupo_id == grupo_id && c.item_id == item).Count() == 0)
                {
                    db.grupo_item.Add(new grupo_item()
                    {
                        item_id = item,
                        grupo_id = grupo_id
                    });
                    db.SaveChanges();

                    var item_adicionado = db.item.Where(c => c.id == item).FirstOrDefault();

                    view.item vItem = new view.item();

                    vItem.id = item_adicionado.id;
                    vItem.nome = item_adicionado.nome;
                    vItem.descricao = item_adicionado.descricao;

                    v.itens.Add(vItem);
                }
            }

            return Ok(0);
        }

        public IHttpActionResult Getitema(int id_do_item, string excluir)
        {
            var item = db.item.Find(id_do_item);

            item.ativo = false;

            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(id_do_item);
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