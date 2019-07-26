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
    public class grupoController : ApiController
    {
        public class view
        {
            public view()
            {
                itens = new List<item>();
                pessoas = new List<pessoa>();
            }
            public int id { get; set; }
            public string nome { get; set; }
            public string descricao { get; set; }
            public int convite { get; set; }
            public List<item> itens { get; set; }
            public List<pessoa> pessoas { get; set; }

            public class item
            {
                public int id { get; set; }
                public string nome { get; set; }
                public string descricao { get; set; }
            }
            public class pessoa
            {
                public int id { get; set; }
                public string nome { get; set; }
                public string email { get; set; }
                public string telefone { get; set; }
                public string celular { get; set; }
            }
        }
        private db db = new db();

        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postgrupo(grupo grupo)
        {
            view v = new view();
            db.grupo.Add(grupo);
            db.SaveChanges();

            db.grupo_pessoa.Add(new grupo_pessoa()
            {
                convite = 0,
                grupo_id = grupo.id,
                pessoa_id = grupo.pessoa_id,
                ativo = true
            });
            db.SaveChanges();

            v.id = grupo.id;
            v.nome = grupo.nome;
            v.descricao = grupo.descricao;
            v.convite = 0;

            //TABELA grupo_pessoa adicionar relação
            //convidar pessoa ler qrcode dela ou pelo email cadastrado no sistema

            return Ok(v);
        }

        public IHttpActionResult Getgrupo(int id, int pessoa_id)
        {
            view v = new view();
            var grupo = db.grupo_pessoa.Include(c => c.grupo).Where(c => c.grupo_id == id && c.pessoa_id == pessoa_id).FirstOrDefault();

            v.id = grupo.grupo.id;
            v.nome = grupo.grupo.nome;
            v.convite = grupo.convite.Value;

            foreach (var item1 in db.grupo_item.Include(c => c.item).Where(c => c.grupo_id == id).ToList())
            {
                view.item vGrupoItem = new view.item();

                vGrupoItem.id = item1.item_id.Value;
                vGrupoItem.nome = item1.item.nome;
                vGrupoItem.descricao = item1.item.descricao;

                v.itens.Add(vGrupoItem);
            }

            foreach (var item1 in db.grupo_pessoa.Include(c => c.pessoa).Where(c => c.grupo_id == id).ToList())
            {
                view.pessoa vGrupoPessoa = new view.pessoa();

                vGrupoPessoa.id = item1.pessoa_id.Value;
                vGrupoPessoa.nome = item1.pessoa.nome;
                vGrupoPessoa.email = item1.pessoa.email;
                vGrupoPessoa.telefone = item1.pessoa.phone == null ? "" : "Telefone: " + item1.pessoa.phone;
                vGrupoPessoa.celular = item1.pessoa.mobile == null ? "" : "Celular: " + item1.pessoa.mobile;

                v.pessoas.Add(vGrupoPessoa);
            }

            return Ok(v);
        }

        public IHttpActionResult Postsairgrupo(int grupo_id, int pessoa_id)
        {
            var grupo_pessoa = db.grupo_pessoa.Where(c => c.grupo_id == grupo_id && c.pessoa_id == pessoa_id).FirstOrDefault();
            grupo_pessoa.convite = 2;
            grupo_pessoa.ativo = false;
            db.Entry(grupo_pessoa).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(grupo_id);
        }

        public IHttpActionResult Postentrargrupo(int grupo_id, int pessoa_id, string aceitar)
        {
            var grupo_pessoa = db.grupo_pessoa.Where(c => c.grupo_id == grupo_id && c.pessoa_id == pessoa_id).FirstOrDefault();
            grupo_pessoa.convite = 0;
            grupo_pessoa.ativo = true;
            db.Entry(grupo_pessoa).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(grupo_id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
    }
}