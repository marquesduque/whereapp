using api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace api
{
    public class notificacaoController : ApiController
    {
        public class view
        {
            public view()
            {
                notificacoes = new List<notificacao>();
            }
            public List<notificacao> notificacoes { get; set; }
            public class notificacao
            {
                public int id { get; set; }
                public string mensagem_previa { get; set; }
                public string mensagem { get; set; }
                public string data { get; set; }
                public int lido { get; set; }
            }
        }
        public db db = new db();

        public IHttpActionResult Get(int pessoa_id)
        {
            view v = new view();
            foreach (var item in db.notificacao.Where(c => c.pessoa_id == pessoa_id).ToList())
            {
                view.notificacao vNotificacao = new view.notificacao();

                vNotificacao.id = item.id;
                for (var i = 0; i < item.mensagem.Split(' ').Length; i++)
                {
                    if (i <= 9)
                    {
                        if(i == (item.mensagem.Split(' ').Length - 1))
                        {
                            vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i];
                        }
                        else if(i == 9)
                        {
                            vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i] + "...";
                        }
                        else
                        {
                            vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i] + " ";
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                vNotificacao.mensagem = item.mensagem;
                vNotificacao.data = item.data == null ? "" : item.data.Value.ToString("dd/MM/yy");
                vNotificacao.lido = item.lido == null ? 0 : item.lido == false ? 0 : 1;

                v.notificacoes.Add(vNotificacao);
            }

            return Ok(v);
        }

        public IHttpActionResult Post(int notificacao_id)
        {
            var notificacao = db.notificacao.Find(notificacao_id);
            notificacao.lido = true;
            db.Entry(notificacao).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(notificacao_id);
        }
    }
}