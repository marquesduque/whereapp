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
    public class rastreadorsController : Controller
    {
        private db db = new db();

		public class find : Models.rastreador
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.rastreador.Include(c => c.item).Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.codigo == null || c.codigo == ent.codigo) &&
									(ent.cadastro == null || c.cadastro == ent.cadastro) &&
									(ent.item_id == null || c.item_id == ent.item_id) &&
									(ent.vinculo == null || c.vinculo == ent.vinculo) &&
									(ent.ativo == null || c.ativo == ent.ativo)
                                    ).Select(c => new
                                    {
                                        id = c.id,
                                        codigo = c.codigo,
                                        cadastro = c.cadastro,
                                        item_id = c.item.nome,
                                        vinculo = c.vinculo,
                                        ativo = c.ativo == true ? "Sim" : "Não"
                                    }
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /rastreadors/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.rastreadorsController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var rastreador = db.rastreador.Include(r => r.item);

            return View(new Site.Models.Find<find>() { });
            return View(rastreador.ToList());
        }

        // GET: /rastreadors/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            rastreador rastreador = db.rastreador.Find(id);
            if (rastreador == null)
            {
                return HttpNotFound();
            }
            return View(rastreador);
        }

        // GET: /rastreadors/Create
        public ActionResult Create()
        {
            
                   return View(new rastreador());
        }

        // POST: /rastreadors/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(rastreador rastreador)
        {
            if (ModelState.IsValid)
            {
                db.rastreador.Add(rastreador);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            return View(rastreador);
        }

        // GET: /rastreadors/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            rastreador rastreador = db.rastreador.Find(id);
            if (rastreador == null)
            {
                return HttpNotFound();
            }
            
            return View(rastreador);
        }

        // POST: /rastreadors/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(rastreador rastreador)
        {
            if (ModelState.IsValid)
            {
                db.Entry(rastreador).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            return View(rastreador);
        }

        // GET: /rastreadors/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            rastreador rastreador = db.rastreador.Find(id);
            if (rastreador == null)
            {
                return HttpNotFound();
            }
            return View(rastreador);
        }

        // POST: /rastreadors/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            rastreador rastreador = db.rastreador.Find(id);
            db.rastreador.Remove(rastreador);
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
