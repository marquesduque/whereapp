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
    public class padrinhoesController : Controller
    {
        private db db = new db();

		public class find : Models.padrinho
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.padrinho.Include(c => c.pessoa).Include(c => c.item).Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.padrinho_id == null || c.padrinho_id == ent.padrinho_id) &&
									(ent.item_id == null || c.item_id == ent.item_id) &&
									(ent.valor == null || c.valor == ent.valor) &&
									(ent.cadastro == null || c.cadastro == ent.cadastro)
                                    ).Select(c => new
                                    {
                                        id = c.id,
                                        padrinho_id = c.pessoa.nome,
                                        item_id = c.item.nome,
                                        valor = c.valor,
                                        cadastro = c.cadastro
                                    }
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /padrinhoes/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.padrinhoesController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var padrinho = db.padrinho.Include(p => p.item).Include(p => p.pessoa);

            return View(new Site.Models.Find<find>() { });
            return View(padrinho.ToList());
        }

        // GET: /padrinhoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            padrinho padrinho = db.padrinho.Find(id);
            if (padrinho == null)
            {
                return HttpNotFound();
            }
            return View(padrinho);
        }

        // GET: /padrinhoes/Create
        public ActionResult Create()
        {
            
            
                   return View(new padrinho());
        }

        // POST: /padrinhoes/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(padrinho padrinho)
        {
            if (ModelState.IsValid)
            {
                db.padrinho.Add(padrinho);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            
            return View(padrinho);
        }

        // GET: /padrinhoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            padrinho padrinho = db.padrinho.Find(id);
            if (padrinho == null)
            {
                return HttpNotFound();
            }
            
            
            return View(padrinho);
        }

        // POST: /padrinhoes/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(padrinho padrinho)
        {
            if (ModelState.IsValid)
            {
                db.Entry(padrinho).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            
            return View(padrinho);
        }

        // GET: /padrinhoes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            padrinho padrinho = db.padrinho.Find(id);
            if (padrinho == null)
            {
                return HttpNotFound();
            }
            return View(padrinho);
        }

        // POST: /padrinhoes/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            padrinho padrinho = db.padrinho.Find(id);
            db.padrinho.Remove(padrinho);
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
