using api.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace api.Controllers
{
    public class comprasController : Controller
    {
        private db db = new db();

        public class find : Models.compra
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            if (ent.data_range != null)
            {
                string[] datas = ent.data_range.Trim().Split('-');
                ent.dataInicio = datas[0] + " 00:00:00";
                ent.dataFim = datas[1] + " 23:59:59";
            }

            DateTime? data1 = ent.dataInicio != null ? Convert.ToDateTime(ent.dataInicio) : new DateTime();
            DateTime? data2 = ent.dataFim != null ? Convert.ToDateTime(ent.dataFim) : new DateTime();

            var list = db.compra
                    .Join(db.compra_item, a => a.id, b => b.compra_id, (a, b) => new { a, b }).Include(c => c.a.pagamento1).Include(c => c.a.status_da_compra)
                    .Where(c =>
                                    (ent.id == 0 || c.a.id == ent.id) &&
                                    (ent.pagarme_status == null || c.a.pagarme_status == ent.pagarme_status) &&
                                    (ent.status_da_compra_id == null || c.a.status_da_compra_id == ent.status_da_compra_id) &&
                                    (ent.pagamento == null || c.a.pagamento == ent.pagamento) &&
                                    (ent.item_id == null || c.b.item_id == ent.item_id) &&
                                    (ent.vendedor_id == null || c.a.vendedor_id == ent.vendedor_id) &&
                                    (data1 == new DateTime() || (c.a.recebido >= data1)) &&
                                    (data2 == new DateTime() || (c.a.recebido <= data2))
                                    ).Select(c => new
                                    {
                                        id = c.a.id,
                                        pagamento = c.a.pagamento,
                                        total = c.a.total,
                                        desconto = c.a.desconto,
                                        pagamento_id = c.a.pagamento1.nome,
                                        preparo = c.a.preparo,
                                        entregue = c.a.entregue,
                                        finalizado = c.a.finalizado,
                                        status_da_compra_id = c.a.status_da_compra.nome,
                                        pago = c.a.pago,
                                        recebido = c.a.recebido,
                                        cancelamento = c.a.cancelamento,
                                        comprador_id = c.a.pessoa.nome,
                                        pagarme_status = c.a.pagarme_status == 0 ? "Aguardando Pagamento" : c.a.pagarme_status == 1 ? "Pagamento em Análise" : c.a.pagarme_status == 2 ? "Pagamento Autorizado" : c.a.pagarme_status == 3 ? "Pagamento Negado" : ""
                                    }
                        ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);

            //var list = db.compra.Include(c => c.pagamento1).Include(c => c.status_da_compra).Where(c =>
            //                        (ent.id == 0 || c.id == ent.id) &&
            //                        (ent.pagamento == null || c.pagamento == ent.pagamento) &&
            //                        (ent.total == null || c.total == ent.total) &&
            //                        (ent.desconto == null || c.desconto == ent.desconto) &&
            //                        (ent.pagamento_id == null || c.pagamento_id == ent.pagamento_id) &&
            //                        (ent.preparo == null || c.preparo == ent.preparo) &&
            //                        (ent.entregue == null || c.entregue == ent.entregue) &&
            //                        (ent.finalizado == null || c.finalizado == ent.finalizado) &&
            //                        (ent.status_da_compra_id == null || c.status_da_compra_id == ent.status_da_compra_id) &&
            //                        (ent.filial_id == null || c.filial_id == ent.filial_id) &&
            //                        (ent.pago == null || c.pago == ent.pago) &&
            //                        (ent.recebido == null || c.recebido == ent.recebido) &&
            //                        (ent.ativo == null || c.ativo == ent.ativo) &&
            //                        (ent.cancelamento == null || c.cancelamento == ent.cancelamento) &&
            //                        (ent.pagarme_id == null || c.pagarme_id == ent.pagarme_id) &&
            //                        (ent.pagarme_status == null || c.pagarme_status == ent.pagarme_status) &&
            //                        (ent.place_id == null || c.place_id == ent.place_id) &&
            //                        (ent.balcao == null || c.balcao == ent.balcao) &&
            //                        (ent.delivery == null || c.delivery == ent.delivery) &&
            //                        (ent.codigo_servicos == null || c.codigo_servicos == ent.codigo_servicos) &&
            //                        (ent.valor_frete == null || c.valor_frete == ent.valor_frete) &&
            //                        (ent.cartao_id == null || c.cartao_id == ent.cartao_id) &&
            //                        (ent.cpf == null || c.cpf == ent.cpf) &&
            //                        (ent.boleto_barcode == null || c.boleto_barcode == ent.boleto_barcode) &&
            //                        (ent.boleto_url == null || c.boleto_url == ent.boleto_url) &&
            //                        (ent.comprador_id == null || c.comprador_id == ent.comprador_id) &&
            //                        (ent.tipo_frete == null || c.tipo_frete == ent.tipo_frete) &&
            //                        (ent.vendedor_id == null || c.vendedor_id == ent.vendedor_id) &&
            //                        (ent.comissao_vendedor == null || c.comissao_vendedor == ent.comissao_vendedor) &&
            //                        (ent.external_id == null || c.external_id == ent.external_id) &&
            //                        (ent.frete == null || c.frete == ent.frete) &&
            //                        (ent.observacao == null || c.observacao == ent.observacao) &&
            //                        (ent.item_id == null || c.compra_item..item_id == ent.item_id)
            //                        ).Select(c => new
            //                        {
            //                            id = c.id,
            //                            pagamento = c.pagamento,
            //                            total = c.total,
            //                            desconto = c.desconto,
            //                            pagamento_id = c.pagamento1.nome,
            //                            preparo = c.preparo,
            //                            entregue = c.entregue,
            //                            finalizado = c.finalizado,
            //                            status_da_compra_id = c.status_da_compra.nome,
            //                            pago = c.pago,
            //                            recebido = c.recebido,
            //                            cancelamento = c.cancelamento,
            //                            comprador_id = c.pessoa.nome,
            //                            pagarme_status = c.pagarme_status == 0 ? "Aguardando Pagamento" : c.pagarme_status == 1 ? "Pagamento em Análise" : c.pagarme_status == 2 ? "Pagamento Autorizado" : c.pagarme_status == 3 ? "Pagamento Negado" : ""
            //                        }
            //            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            //return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /compras/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.comprasController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var compra = db.compra.Include(c => c.cartao1).Include(c => c.compra_item).Include(c => c.pagamento1).Include(c => c.pessoa).Include(c => c.pessoa1).Include(c => c.status_da_compra);

            return View(new Site.Models.Find<find>() { });
            return View(compra.ToList());
        }

        // GET: /compras/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra compra = db.compra.Find(id);
            if (compra == null)
            {
                return HttpNotFound();
            }
            return View(compra);
        }

        public string AtualizaCompra(int id, int status)
        {
            DateTime? data_retorno = new DateTime(); 
            compra compra = db.compra.Find(id);
            compra.status_da_compra_id = status;

            if (status == 2)
            {
                compra.preparo = DateTime.Now;
                data_retorno = compra.preparo;
            }
            else if (status == 3)
            {
                compra.finalizado = DateTime.Now;
                data_retorno = compra.finalizado;
            }
            else if (status == 4)
            {
                compra.entregue = DateTime.Now;
                data_retorno = compra.entregue;
            }
            else if (status == 5)
            {
                compra.cancelamento = DateTime.Now;
                data_retorno = compra.cancelamento;
            }

            db.Entry(compra).State = EntityState.Modified;
            db.SaveChanges();

            string data = data_retorno.Value.ToShortDateString() + " - " + data_retorno.Value.ToShortTimeString();
            
            return (data);                
        }


        public ActionResult AtualizaCompras(int id, int status)
        {
            compra compra = db.compra.Find(id);
            compra.status_da_compra_id = status;

            if (status == 2){

                compra.preparo = DateTime.Now;

            }else if (status == 3)
            {
                compra.finalizado = DateTime.Now;

            }else if (status == 4)
            {
                compra.entregue = DateTime.Now;

            } else if (status == 5)
            {
                compra.cancelamento = DateTime.Now;
            }         

            db.Entry(compra).State = EntityState.Modified;
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        // GET: /compras/Create
        public ActionResult Create(int? comprador_id, int? vendedor_id)
        {
            if (comprador_id != null)
            {
                return View(new compra() { comprador_id = comprador_id });
            }
            else if (vendedor_id != null)
            {
                return View(new compra() { vendedor_id = vendedor_id });
            }
            else
            {
                return View(new compra());
            }
        }

        // POST: /compras/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(compra compra)
        {
            if (ModelState.IsValid)
            {
                db.compra.Add(compra);
                db.SaveChanges();
                if (Request.QueryString["comprador_id"] != null)
                {
                    return RedirectToAction("Index", new { comprador_id = Request.QueryString["comprador_id"] });
                }
                else if (Request.QueryString["vendedor_id"] != null)
                {
                    return RedirectToAction("Index", new { comprador_id = Request.QueryString["vendedor_id"] });
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }

            return View(compra);
        }

        // GET: /compras/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra compra = db.compra.Find(id);
            if (compra == null)
            {
                return HttpNotFound();
            }

            return View(compra);
        }

        // POST: /compras/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(compra compra)
        {
            if (ModelState.IsValid)
            {
                compra compras = db.compra.Find(compra.id);
                compras.rua = compra.rua;
                compras.numero = compra.numero;
                compras.complemento = compra.complemento;
                compras.cidade = compra.cidade;
                compras.pais = compra.pais;
                compras.complemento = compra.complemento;
                compras.cep = compra.cep;

                db.Entry(compras).State = EntityState.Modified;
                db.SaveChanges();

                if (Request.QueryString["comprador_id"] != null)
                {
                    return RedirectToAction("Index", new { comprador_id = Request.QueryString["comprador_id"] });
                }
                else if (Request.QueryString["vendedor_id"] != null)
                {
                    return RedirectToAction("Index", new { comprador_id = Request.QueryString["vendedor_id"] });
                }
                else
                {
                    return RedirectToAction("Edit", new { id = compra.id });
                }
            }
            
            return View(compra);
        }

        // GET: /compras/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra compra = db.compra.Find(id);
            if (compra == null)
            {
                return HttpNotFound();
            }
            return View(compra);
        }

        // POST: /compras/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            compra compra = db.compra.Find(id);
            db.compra.Remove(compra);
            db.SaveChanges();

            if (Request.QueryString["comprador_id"] != null)
            {
                return Json(new { redirect = Url.Action("Index", new { comprador_id = Request.QueryString["comprador_id"] }) });
                return RedirectToAction("Index", new { comprador_id = Request.QueryString["comprador_id"] });
            }
            else if (Request.QueryString["vendedor_id"] != null)
            {
                return Json(new { redirect = Url.Action("Index", new { comprador_id = Request.QueryString["comprador_id"] }) });
                return RedirectToAction("Index", new { comprador_id = Request.QueryString["vendedor_id"] });
            }
            else
            {
                return Json(new { redirect = Url.Action("Index") });
                return RedirectToAction("Index");
            }
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
