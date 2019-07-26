using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using api.Models;

namespace api.Controllers
{
    public class pagamentoesController : Controller
    {
        private db db = new db();

		public class find : Models.pagamento
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.pagamento.Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.nome == null || c.nome == ent.nome) &&
									(ent.taxa == null || c.taxa == ent.taxa) &&
									(ent.grupo_do_pagamento_id == null || c.grupo_do_pagamento_id == ent.grupo_do_pagamento_id) &&
									(ent.bandeira_id == null || c.bandeira_id == ent.bandeira_id) &&
									(ent.place_id == null || c.place_id == ent.place_id) &&
									(ent.transacao == null || c.transacao == ent.transacao) &&
									(ent.external_id == null || c.external_id == ent.external_id) 
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /pagamentoes/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.pagamentoesController.find>() { });
            return View(db.pagamento.ToList());
        }

        // GET: /pagamentoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pagamento pagamento = db.pagamento.Find(id);
            if (pagamento == null)
            {
                return HttpNotFound();
            }
            return View(pagamento);
        }

        // GET: /pagamentoes/Create
        public ActionResult Create()
        {
                   return View(new pagamento());
        }

        // POST: /pagamentoes/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(pagamento pagamento)
        {
            if (ModelState.IsValid)
            {
                db.pagamento.Add(pagamento);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(pagamento);
        }

        // GET: /pagamentoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pagamento pagamento = db.pagamento.Find(id);
            if (pagamento == null)
            {
                return HttpNotFound();
            }
            return View(pagamento);
        }

        // POST: /pagamentoes/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(pagamento pagamento)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pagamento).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(pagamento);
        }

        // GET: /pagamentoes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pagamento pagamento = db.pagamento.Find(id);
            if (pagamento == null)
            {
                return HttpNotFound();
            }
            return View(pagamento);
        }

        // POST: /pagamentoes/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            pagamento pagamento = db.pagamento.Find(id);
            db.pagamento.Remove(pagamento);
            db.SaveChanges();

            return Json(new { redirect = Url.Action("Index") });
            return RedirectToAction("Index");
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
