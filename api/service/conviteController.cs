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
    public class conviteController : ApiController
    {
        private db db = new db();

        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postconvite(string email, int grupo_id, int pessoa_id)
        {
            var pessoa = db.pessoa.Where(c => c.email == email).FirstOrDefault();

            if (pessoa == null)
            {
                return Ok(0);
            }
            else
            {
                var grupo_pessoa = db.grupo_pessoa.Where(c => c.grupo_id == grupo_id && c.pessoa_id == pessoa.id).FirstOrDefault();

                if (grupo_pessoa == null)
                {
                    db.grupo_pessoa.Add(new grupo_pessoa()
                    {
                        convite = 1,
                        grupo_id = grupo_id,
                        pessoa_id = pessoa.id,
                        ativo = true
                    });

                    var notificacao = db.notificacao.Add(new notificacao()
                    {
                        pessoa_id = pessoa.id,
                        mensagem = "Olá " + pessoa.nome + ", voce foi convidado para participar do Grupo " + db.grupo.Where(c => c.id == grupo_id).Select(c => c.nome).FirstOrDefault() + " pelo " + db.pessoa.Where(c => c.id == pessoa_id).Select(c => c.nome).FirstOrDefault() + ".",
                        lido = false,
                        data = DateTime.Now
                    });
                    
                    db.SaveChanges();

                    if (pessoa.push_arn != null)
                    {
                        new Utility.SNS().SendPush(pessoa.push_arn, notificacao.mensagem);
                    }

                    return Ok(2);
                }
                else
                {
                    if(grupo_pessoa.ativo == false)
                    {
                        grupo_pessoa.ativo = true;
                        grupo_pessoa.convite = 1;

                        var notificacao = db.notificacao.Add(new notificacao()
                        {
                            pessoa_id = pessoa.id,
                            mensagem = "Olá " + pessoa.nome + ", voce foi convidado para participar do Grupo " + db.grupo.Where(c => c.id == grupo_id).Select(c => c.nome).FirstOrDefault() + " pelo " + db.pessoa.Where(c => c.id == pessoa_id).Select(c => c.nome).FirstOrDefault() + ".",
                            lido = false,
                            data = DateTime.Now
                        });

                        db.SaveChanges();

                        if (pessoa.push_arn != null)
                        {
                            new Utility.SNS().SendPush(pessoa.push_arn, notificacao.mensagem);
                        }

                        return Ok(2);
                    }
                    return Ok(1);
                }
            }
        }

        public IHttpActionResult Postitemgrupo([FromUri] int[] item_id, int grupo_id)
        {
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