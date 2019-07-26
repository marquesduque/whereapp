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
    public class responsavel_juridicoController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
            public int id { get; set; }
            public string nome { get; set; }
            public string email { get; set; }
            public string cpf { get; set; }
            public string rg { get; set; }
            public string telefone { get; set; }
            public string celular { get; set; }
            public string cargo_posicao { get; set; }
            public int porcentagem { get; set; }
            public int pessoa_id { get; set; }
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Postresponsavel(responsavel_juridico responsavel_juridico)
        {
            view v = new view();
            if(responsavel_juridico.id == 0)
            {
                db.responsavel_juridico.Add(responsavel_juridico);
                db.SaveChanges();
            }
            else
            {
                var responsavel =  db.responsavel_juridico.Find(responsavel_juridico.id);
                responsavel.id = responsavel_juridico.id;
                responsavel.nome = responsavel_juridico.nome;
                responsavel.email = responsavel_juridico.email;
                responsavel.cpf = responsavel_juridico.cpf;
                responsavel.rg = responsavel_juridico.rg;
                responsavel.telefone = responsavel_juridico.telefone;
                responsavel.celular = responsavel_juridico.celular;
                responsavel.cargo_posicao = responsavel_juridico.cargo_posicao;
                responsavel.porcentagem = responsavel_juridico.porcentagem == null ? 0 : responsavel_juridico.porcentagem.Value;
                responsavel.pessoa_id = responsavel_juridico.pessoa_id.Value;

                db.Entry(responsavel).State = EntityState.Modified;
                db.SaveChanges();
            }
            

            v.id = responsavel_juridico.id;
            v.nome = responsavel_juridico.nome;
            v.email = responsavel_juridico.email;
            v.cpf = responsavel_juridico.cpf;
            v.rg = responsavel_juridico.rg;
            v.telefone = responsavel_juridico.telefone;
            v.celular = responsavel_juridico.celular;
            v.cargo_posicao = responsavel_juridico.cargo_posicao;
            v.porcentagem = responsavel_juridico.porcentagem == null ? 0 : responsavel_juridico.porcentagem.Value;
            v.pessoa_id = responsavel_juridico.pessoa_id.Value;

            return Ok(v);
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