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
    public class assinaturaController : ApiController
    {
        private db db = new db();

        public class assinatura
        {
            public int assinatura_id { get; set; }
            public int pessoa_id { get; set; }
            public int item_id { get; set; }
            public string nome_assinatura { get; set; }
            public decimal valor_mensal { get; set; }
            public int dia_cobranca { get; set; }
            public string plano { get; set; }
            public string nome_usuario { get; set; }
            public string email_usuario { get; set; }
            public string hash { get; set; }
            public string telefone_usuario { get; set; }
            public string cpf_usuario { get; set; }
            public string estado { get; set; }
            public string cidade { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string card_token { get; set; }
            public string nome_cartao { get; set; }
            public string data_nascimento { get; set; }
        }

        [HttpPost]
        public IHttpActionResult Postassinatura(assinatura assinatura)
        {
            Utility.Pagamento.pagseguro.assinatura ent = new Utility.Pagamento.pagseguro.assinatura();
            Utility.Pagamento.pagseguro pagseguro = new Utility.Pagamento.pagseguro();

            var a = db.assinatura.Add(new Models.assinatura
            {
                pessoa_id = assinatura.pessoa_id,
                item_id = assinatura.item_id,
                valor = assinatura.valor_mensal
            });
            //db.SaveChanges();

            ent.assinatura_id = a.id;
            ent.nome_usuario = assinatura.nome_usuario;
            ent.email_usuario = assinatura.email_usuario;
            ent.telefone_usuario = assinatura.telefone_usuario;
            ent.nome_assinatura = assinatura.nome_assinatura;
            ent.valor_mensal = assinatura.valor_mensal;
            ent.dia_cobranca = assinatura.dia_cobranca;
            ent.cpf_usuario = assinatura.cpf_usuario;

            ent.plano = Utility.Pagamento.pagseguro.criar_plano(ent);

            ent.hash = assinatura.hash;
            ent.card_token = assinatura.card_token;
            ent.nome_cartao = assinatura.nome_cartao;
            ent.data_nascimento = assinatura.data_nascimento;

            ent.rua = assinatura.rua;
            ent.numero = assinatura.numero;
            ent.complemento = assinatura.complemento;
            ent.bairro = assinatura.bairro;
            ent.cep = assinatura.cep;
            ent.cidade = assinatura.cidade;
            ent.estado = assinatura.estado;

            pagseguro.assinar_plano(ent);

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