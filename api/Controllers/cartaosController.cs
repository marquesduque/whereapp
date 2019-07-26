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
    public class cartaosController : Controller
    {
        private db db = new db();

        public class find : Models.cartao
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.cartao.Where(c =>
                                    (ent.id == 0 || c.id == ent.id) &&

                                    (ent.numero == null || c.numero == ent.numero) &&
                                    (ent.nome == null || c.nome == ent.nome) &&
                                    (ent.expiracao == null || c.expiracao == ent.expiracao) &&
                                    (ent.cvv == null || c.cvv == ent.cvv) &&
                                    (ent.hash == null || c.hash == ent.hash) &&
                                    (ent.pessoa_id == null || c.pessoa_id == ent.pessoa_id) &&
                                    (ent.documento == null || c.documento == ent.documento) &&
                                    (ent.pagarme_id == null || c.pagarme_id == ent.pagarme_id) &&
                                    (ent.bandeira == null || c.bandeira == ent.bandeira) &&
                                    (ent.place_id == null || c.place_id == ent.place_id) &&
                                    (ent.compra_id == null || c.compra_id == ent.compra_id)
                        ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /cartaos/
        public ActionResult Index(int pessoa_id)
        {
            var filter = new Site.Models.Find<api.Controllers.cartaosController.find>();
            filter.Filter = new find();
            filter.Filter.pessoa_id = pessoa_id;
            return View(filter);
        }

        // GET: /cartaos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            cartao cartao = db.cartao.Find(id);
            if (cartao == null)
            {
                return HttpNotFound();
            }
            return View(cartao);
        }

        // GET: /cartaos/Create
        public ActionResult Create(int pessoa_id)
        {
            return View(new cartao() { pessoa_id = pessoa_id });
        }

        // POST: /cartaos/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(cartao cartao)
        {
            if (ModelState.IsValid)
            {
                db.cartao.Add(cartao);
                db.SaveChanges();
                return RedirectToAction("Index", new { pessoa_id = Request.QueryString["pessoa_id"] });
            }



            return View(cartao);
        }

        // GET: /cartaos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            cartao cartao = db.cartao.Find(id);
            if (cartao == null)
            {
                return HttpNotFound();
            }


            return View(cartao);
        }

        // POST: /cartaos/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(cartao cartao)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cartao).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", new { pessoa_id = Request.QueryString["pessoa_id"] });
            }


            return View(cartao);
        }

        // GET: /cartaos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            cartao cartao = db.cartao.Find(id);
            if (cartao == null)
            {
                return HttpNotFound();
            }
            return View(cartao);
        }

        // POST: /cartaos/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            cartao cartao = db.cartao.Find(id);
            db.cartao.Remove(cartao);
            db.SaveChanges();

            return Json(new { redirect = Url.Action("Index", new { pessoa_id = Request.QueryString["pessoa_id"] }) });
            return RedirectToAction("Index", new { pessoa_id = Request.QueryString["pessoa_id"] });
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
