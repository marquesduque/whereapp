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
    public class compra_itemController : Controller
    {
        private db db = new db();

		public class find : Models.compra_item
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.compra_item.Include(c => c.item).Include(c => c.compra.pessoa).Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.item_id == null || c.item_id == ent.item_id) &&
									(ent.compra_id == null || c.compra_id == ent.compra_id) &&
									(ent.status == null || c.status == ent.status)
                                    ).Select(c => new
                                    {
                                        id = c.id,
                                        compra_id = c.compra_id,
                                        valor = c.compra.total,
                                        item_nome = c.item.nome,
                                        item_foto = c.item.photo,
                                        item_foto_itype = c.item.photo_itype,
                                        comprador_nome = c.item.pessoa.nome,
                                        comprador_telefone = c.compra.pessoa.phone,
                                        comprador_celular = c.compra.pessoa.phone_optional,
                                        comprador_rg = c.compra.pessoa.rg,
                                        comprador_cpf = c.compra.pessoa.cpf,
                                        retirada = c.compra.delivery,
                                        status = c.status

                                    }
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).GroupBy(c => c.compra_id).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /compra_item/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.compra_itemController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var compra_item = db.compra_item.Include(c => c.compra).Include(c => c.item);

            return View(new Site.Models.Find<find>() { });
            return View(compra_item.ToList());
        }

        // GET: /compra_item/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra_item compra_item = db.compra_item.Find(id);
            if (compra_item == null)
            {
                return HttpNotFound();
            }
            return View(compra_item);
        }

        // GET: /compra_item/Create
        public ActionResult Create()
        {
            
            
                   return View(new compra_item());
        }

        // POST: /compra_item/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(compra_item compra_item)
        {
            if (ModelState.IsValid)
            {
                db.compra_item.Add(compra_item);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            
            return View(compra_item);
        }

        // GET: /compra_item/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra_item compra_item = db.compra_item.Find(id);
            if (compra_item == null)
            {
                return HttpNotFound();
            }
            
            
            return View(compra_item);
        }

        // POST: /compra_item/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(compra_item compra_item)
        {
            if (ModelState.IsValid)
            {
                db.Entry(compra_item).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            
            return View(compra_item);
        }

        // GET: /compra_item/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            compra_item compra_item = db.compra_item.Find(id);
            if (compra_item == null)
            {
                return HttpNotFound();
            }
            return View(compra_item);
        }

        // POST: /compra_item/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            compra_item compra_item = db.compra_item.Find(id);
            db.compra_item.Remove(compra_item);
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
