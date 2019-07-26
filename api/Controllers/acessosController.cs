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
    public class acessosController : Controller
    {
        private db db = new db();

		public class find : Models.acesso
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.acesso.Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.create == null || c.create == ent.create) &&
									(ent.edit == null || c.edit == ent.edit) &&
									(ent.delete == null || c.delete == ent.delete) &&
									(ent.list == null || c.list == ent.list) &&
									(ent.perfil_id == null || c.perfil_id == ent.perfil_id) &&
									(ent.url == null || c.url == ent.url) &&
									(ent.name == null || c.name == ent.name) &&
									(ent.icon == null || c.icon == ent.icon) &&
									(ent.group == null || c.group == ent.group) &&
									(ent.order == null || c.order == ent.order) &&
									(ent.place_id == null || c.place_id == ent.place_id)
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /acessos/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.acessosController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var acesso = db.acesso.Include(a => a.perfil);

            return View(new Site.Models.Find<find>() { });
            return View(acesso.ToList());
        }

        // GET: /acessos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acesso acesso = db.acesso.Find(id);
            if (acesso == null)
            {
                return HttpNotFound();
            }
            return View(acesso);
        }

        // GET: /acessos/Create
        public ActionResult Create()
        {
            
                   return View(new acesso());
        }

        // POST: /acessos/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(acesso acesso)
        {
            if (ModelState.IsValid)
            {
                db.acesso.Add(acesso);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            return View(acesso);
        }

        // GET: /acessos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acesso acesso = db.acesso.Find(id);
            if (acesso == null)
            {
                return HttpNotFound();
            }
            
            return View(acesso);
        }

        // POST: /acessos/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(acesso acesso)
        {
            if (ModelState.IsValid)
            {
                db.Entry(acesso).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            return View(acesso);
        }

        // GET: /acessos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acesso acesso = db.acesso.Find(id);
            if (acesso == null)
            {
                return HttpNotFound();
            }
            return View(acesso);
        }

        // POST: /acessos/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            acesso acesso = db.acesso.Find(id);
            db.acesso.Remove(acesso);
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
