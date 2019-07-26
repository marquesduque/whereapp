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
    public class localizacaosController : Controller
    {
        private db db = new db();

		public class find : Models.localizacao
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.localizacao.Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.item_id == null || c.item_id == ent.item_id) &&
									(ent.lat == null || c.lat == ent.lat) &&
									(ent.lng == null || c.lng == ent.lng) &&
									(ent.cadastro == null || c.cadastro == ent.cadastro) &&
									(ent.descricao == null || c.descricao == ent.descricao) &&
									(ent.ativo == null || c.ativo == ent.ativo)
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /localizacaos/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.localizacaosController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var localizacao = db.localizacao.Include(l => l.item);

            return View(new Site.Models.Find<find>() { });
            return View(localizacao.ToList());
        }

        // GET: /localizacaos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            localizacao localizacao = db.localizacao.Find(id);
            if (localizacao == null)
            {
                return HttpNotFound();
            }
            return View(localizacao);
        }

        // GET: /localizacaos/Create
        public ActionResult Create()
        {
            
                   return View(new localizacao());
        }

        // POST: /localizacaos/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(localizacao localizacao)
        {
            if (ModelState.IsValid)
            {
                db.localizacao.Add(localizacao);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            return View(localizacao);
        }

        // GET: /localizacaos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            localizacao localizacao = db.localizacao.Find(id);
            if (localizacao == null)
            {
                return HttpNotFound();
            }
            
            return View(localizacao);
        }

        // POST: /localizacaos/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(localizacao localizacao)
        {
            if (ModelState.IsValid)
            {
                db.Entry(localizacao).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            return View(localizacao);
        }

        // GET: /localizacaos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            localizacao localizacao = db.localizacao.Find(id);
            if (localizacao == null)
            {
                return HttpNotFound();
            }
            return View(localizacao);
        }

        // POST: /localizacaos/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            localizacao localizacao = db.localizacao.Find(id);
            db.localizacao.Remove(localizacao);
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
