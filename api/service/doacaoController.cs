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
    public class doacaoController : ApiController
    {
        public class view
        {
            public view()
            {
                adocaos = new List<adocao>();
                ongs = new List<ong>();
            }
            public List<adocao> adocaos { get; set; }
            public List<ong> ongs { get; set; }

            public class adocao
            {
                public int id { get; set; }
                public string nome { get; set; }
                public string descricao { get; set; }
                public int id_doador { get; set; }
                public string nome_doador { get; set; }
                public int tipo { get; set; }
            }
            public class ong
            {
                public int id { get; set; }
                public string nome { get; set; }
                public string descricao { get; set; }
            }
        }
        private db db = new db();

        public IHttpActionResult Getdoacao(int pessoa_id, int tipo_id)
        {
            view v = new view();

            foreach (var item in db.item.Include(c => c.pessoa).Where(c => c.doacao == true && pessoa_id != c.responsavel_id && c.tipo_id == tipo_id).ToList())
            {
                view.adocao vAdocao = new view.adocao();

                vAdocao.id = item.id;
                vAdocao.nome = item.nome;
                vAdocao.descricao = item.descricao;
                vAdocao.id_doador = item.pessoa.id;
                vAdocao.nome_doador = item.pessoa.nome;
                vAdocao.tipo = item.tipo_id.Value;

                v.adocaos.Add(vAdocao);
            }

            foreach (var item in db.pessoa.Where(c => c.perfil_id == 4).ToList())
            {
                view.ong vOng = new view.ong();

                vOng.id = item.id;
                vOng.nome = item.nome;
                vOng.descricao = item.description;

                v.ongs.Add(vOng);
            }

            return Ok(v);
        }

        public IHttpActionResult Postdocao(int pessoa_id, int doador_id, int item_id)
        {
            var doador = db.pessoa.Find(doador_id);
            var pessoa = db.pessoa.Find(pessoa_id);
            var item = db.item.Find(item_id);
            var mensagem = "Olá " + doador.nome + ", o usuario " + pessoa.nome + " demonstrou interesse a adotar/aceitar a doação do " + item.nome + ", os dados para contato do usuario são por - email: " + pessoa.email +" telefone: " + pessoa.mobile + ".";
            db.notificacao.Add(new notificacao
            {
                mensagem = mensagem,
                pessoa_id = pessoa_id,
                lido = false,
                data = DateTime.Now
            });

            Utility.Email.SendEmail("naoresponda@creait.com.br", doador.email, "Interesse Doação - WhereApp", mensagem);

            if(!string.IsNullOrEmpty(doador.push_arn))
            {
                new Utility.SNS().SendPush(doador.push_arn, mensagem);
            }
            
            db.SaveChanges();

            return Ok(0);
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