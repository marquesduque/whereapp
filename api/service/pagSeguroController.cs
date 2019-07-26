using api.Models;
using System;
using System;
using System.Collections.Generic;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Xml;
using Uol.PagSeguro;
using Uol.PagSeguro.Constants;
using Uol.PagSeguro.Domain;
using Uol.PagSeguro.Domain;
using Uol.PagSeguro.Domain.Direct;
using Uol.PagSeguro.Exception;
using Uol.PagSeguro.Exception;
using Uol.PagSeguro.Log;
using Uol.PagSeguro.Resources;
using Uol.PagSeguro.Resources;
using Uol.PagSeguro.Service;
using Uol.PagSeguro.Util;
using Uol.PagSeguro.XmlParse;

namespace api
{
    public class pagSeguroController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                itens = new List<item>();
            }

            public int id { get; set; }
            public string nome { get; set; }
            public string nome_cartao { get; set; }
            public string cpf { get; set; }
            public string email { get; set; }
            public string hash { get; set; }
            public string card_token { get; set; }
            public string expiracao { get; set; }
            public string data_nascimento { get; set; }
            public string telefone { get; set; }
            public decimal valor_total { get; set; }
            public int loja_id { get; set; }
            public int pessoa_id { get; set; }
            public bool endereco_bool { get; set; }
            public string rua_entrega { get; set; }
            public string numero_entrega { get; set; }
            public string complemento_entrega { get; set; }
            public string bairro_entrega { get; set; }
            public string cep_entrega { get; set; }
            public string cidade_entrega { get; set; }
            public string estado_entrega { get; set; }
            public string estado { get; set; }
            public string cidade { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string tipo { get; set; }
            public List<item> itens { get; set; }
            public class item
            {
                public int id { get; set; }
                public string nome { get; set; }
                public int qtde { get; set; }
                public string descricao { get; set; }
                public decimal valor { get; set; }
            }
        }

        public IHttpActionResult PostCompra(view view)
        {
            Utility.Pagamento.pagseguro.compra ent = new Utility.Pagamento.pagseguro.compra();
            Utility.Pagamento.pagseguro pagseguro = new Utility.Pagamento.pagseguro();

            var compra = db.compra.Add(new compra
            {
                comprador_id = view.pessoa_id,
                vendedor_id = view.loja_id,
                total = view.valor_total,
                delivery = view.endereco_bool,
                balcao = !view.endereco_bool,
                pagarme_status = 0,
                status_da_compra_id = 1,
                rua = view.rua_entrega,
                numero = view.numero_entrega,
                complemento = view.complemento_entrega,
                bairro = view.bairro_entrega,
                cep = view.cep_entrega,
                cidade = view.cidade_entrega,
                estado = view.estado_entrega,
                recebido = DateTime.Now
            });
            db.SaveChanges();

            ent.nome = view.nome;
            ent.nome_cartao = view.nome_cartao;
            ent.email = view.email;
            ent.compra_id = compra.id;
            ent.cpf = view.cpf;
            ent.hash = view.hash;
            ent.card_token = view.card_token;
            ent.expiracao = view.expiracao;
            ent.valor_total = view.valor_total;
            ent.telefone = view.telefone;
            ent.data_nascimento = view.data_nascimento;

            if (view.endereco_bool == false)
            {
                ent.rua_entrega = "Av. Brig. Faria Lima";
                ent.numero_entrega = "1384";
                ent.complemento_entrega = "5o andar";
                ent.bairro_entrega = "Jardim Paulistano";
                ent.cep_entrega = "01452002";
                ent.cidade_entrega = "Sao Paulo";
                ent.estado_entrega = "SP";
            }
            else
            {
                ent.rua_entrega = view.rua_entrega;
                ent.numero_entrega = view.numero_entrega;
                ent.complemento_entrega = view.complemento_entrega;
                ent.bairro_entrega = view.bairro_entrega;
                ent.cep_entrega = view.cep_entrega;
                ent.cidade_entrega = view.cidade_entrega;
                ent.estado_entrega = view.estado_entrega;
            }

            ent.rua = view.rua;
            ent.numero = view.numero;
            ent.complemento = view.complemento;
            ent.bairro = view.bairro;
            ent.cep = view.cep;
            ent.cidade = view.cidade;
            ent.estado = view.estado;


            foreach (var item in view.itens)
            {
                db.compra_item.Add(new compra_item
                {
                    item_id = item.id,
                    compra_id = compra.id,
                    quantidade = item.qtde,
                    status = 0
                });
                db.SaveChanges();

                var alterar_estoque = db.item.Find(item.id);
                alterar_estoque.estoque = alterar_estoque.estoque - item.qtde;
                db.Entry(alterar_estoque).State = EntityState.Modified;
                db.SaveChanges();

                ent.produtos.Add(new Utility.Pagamento.pagseguro.compra.produto
                {
                    id = item.id,
                    nome = item.nome,
                    quantidade = item.qtde,
                    valor = item.valor
                });
            }
            if (view.tipo == "credito")
            {
                var credito = Utility.Pagamento.pagseguro.card(ent);

                if (credito == "Erro")
                {
                    foreach (var i in db.compra_item.Where(c => c.compra_id == compra.id).ToList())
                    {
                        var alterar_estoque = db.item.Find(i.item_id);
                        alterar_estoque.estoque = alterar_estoque.estoque + i.quantidade;
                        db.Entry(alterar_estoque).State = EntityState.Modified;
                        db.SaveChanges();

                        db.compra_item.Remove(i);
                        db.SaveChanges();
                    }
                    db.compra.Remove(db.compra.Find(compra.id));
                    db.SaveChanges();
                    return Ok(0);
                }
                else
                {
                    return Ok(1);
                }
            }
            else
            {
                var boleto = Utility.Pagamento.pagseguro.boleto(ent);
                if (boleto == "Erro")
                {
                    foreach (var i in db.compra_item.Where(c => c.compra_id == compra.id).ToList())
                    {
                        var alterar_estoque = db.item.Find(i.item_id);
                        alterar_estoque.estoque = alterar_estoque.estoque + i.quantidade;
                        db.Entry(alterar_estoque).State = EntityState.Modified;
                        db.SaveChanges();

                        db.compra_item.Remove(i);
                        db.SaveChanges();
                    }
                    db.compra.Remove(db.compra.Find(compra.id));
                    db.SaveChanges();
                    return Ok(0);
                }
                else
                {
                    compra.boleto_url = boleto;
                    db.Entry(compra).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(1);
                }
            }
        }

        public IHttpActionResult GetSession()
        {
            return Ok(Utility.Pagamento.pagseguro.session);
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