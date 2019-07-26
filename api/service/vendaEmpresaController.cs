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
    public class vendaEmpresaController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                vendas = new List<venda>();
            }
            public List<venda> vendas { get; set; }

            public class venda
            {
                public venda()
                {
                    itens = new List<item>();
                }
                public int id { get; set; }
                public decimal total { get; set; }
                public string balcao_delivery { get; set; }
                public string forma_pagamento { get; set; }
                public string comprador { get; set; }
                public string status { get; set; }
                public List<item> itens { get; set; }

                public class item
                {
                    public int id { get; set; }
                    public string nome { get; set; }
                    public decimal valor { get; set; }
                    public string descricao { get; set; }
                    public int qtd { get; set; }
                }
            }
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Getvenda(int vendedor_id)
        {

            view v = new view();
            var venda = db.compra.Where(c => c.vendedor_id == vendedor_id).OrderBy(c => c.pagarme_status).ToList();

            foreach (var item in venda)
            {
                view.venda vVenda = new view.venda();

                vVenda.id = item.id;
                vVenda.total = item.total.Value;
                vVenda.balcao_delivery = item.balcao == false ? "Delivery" : "Em loja";
                vVenda.forma_pagamento = item.boleto_url == null || item.boleto_url == "" ? "Cartão de Crédito" : "Boleto";
                vVenda.comprador = db.pessoa.Find(item.comprador_id).nome;
                vVenda.status = item.pagarme_status == 0 ? "Aguardando Pagamento" : "Pagamento Realizado";

                foreach (var item1 in db.compra_item.Where(c => c.compra_id == item.id).Include(c => c.item).ToList())
                {
                    view.venda.item vVendaItem = new view.venda.item();

                    vVendaItem.id = item1.item.id;
                    vVendaItem.nome = item1.item.nome;
                    vVendaItem.qtd = item1.quantidade.Value;
                    vVendaItem.valor = item1.item.valor.Value;
                    vVendaItem.descricao = item1.item.descricao;

                    vVenda.itens.Add(vVendaItem);
                }
                v.vendas.Add(vVenda);
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