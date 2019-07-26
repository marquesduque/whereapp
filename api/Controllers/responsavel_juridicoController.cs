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
    public class responsavel_juridicoController : Controller
    {
        private db db = new db();

		public class find : Models.responsavel_juridico
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.responsavel_juridico.Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.nome == null || c.nome.ToLower().Contains(ent.nome.ToLower())) &&
									(ent.rg == null || c.rg.ToLower().Contains(ent.rg.ToLower())) &&
									(ent.cpf == null || c.cpf.ToLower().Contains(ent.cpf.ToLower())) &&
									(ent.email == null || c.email.ToLower().Contains(ent.email.ToLower())) &&
									(ent.celular == null || c.celular.ToLower().Contains(ent.celular.ToLower())) &&
									(ent.telefone == null || c.telefone.ToLower().Contains(ent.telefone.ToLower())) &&
									(ent.porcentagem == null || c.porcentagem == ent.porcentagem) &&
									(ent.cargo_posicao == null || c.cargo_posicao == ent.cargo_posicao) &&
									(ent.pessoa_id == null || c.pessoa_id == ent.pessoa_id) 
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /responsavel_juridico/
        public ActionResult Index()
        {
            var filter = new Site.Models.Find<api.Controllers.responsavel_juridicoController.find>();
            filter.Filter = new find();
            filter.Filter.pessoa_id = Utility.Session.Login.Id;
            return View(filter);
        }

        // GET: /responsavel_juridico/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            responsavel_juridico responsavel_juridico = db.responsavel_juridico.Find(id);
            if (responsavel_juridico == null)
            {
                return HttpNotFound();
            }
            return View(responsavel_juridico);
        }

        // GET: /responsavel_juridico/Create
        public ActionResult Create()
        {
            return View(new responsavel_juridico() { tipo_acesso = 2 } );
        }

        // POST: /responsavel_juridico/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(responsavel_juridico responsavel_juridico)
        {

            if (db.responsavel_juridico.Where(c => c.email.ToLower().Trim() == responsavel_juridico.email.ToLower().Trim()).Count() > 0)
            {
                ModelState.AddModelError("email", "Este email já está sendo utilizado, digite outro.");
            }

            if (ModelState.IsValid)
            {
                db.responsavel_juridico.Add(responsavel_juridico);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            
            return View(responsavel_juridico);
        }

        // GET: /responsavel_juridico/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            responsavel_juridico responsavel_juridico = db.responsavel_juridico.Find(id);
            if (responsavel_juridico == null)
            {
                return HttpNotFound();
            }
            
            return View(responsavel_juridico);
        }

        // POST: /responsavel_juridico/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(responsavel_juridico responsavel_juridico)
        {
            if (ModelState.IsValid)
            {
                db.Entry(responsavel_juridico).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            return View(responsavel_juridico);
        }

        // GET: /responsavel_juridico/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            responsavel_juridico responsavel_juridico = db.responsavel_juridico.Find(id);
            if (responsavel_juridico == null)
            {
                return HttpNotFound();
            }
            return View(responsavel_juridico);
        }

        // POST: /responsavel_juridico/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            responsavel_juridico responsavel_juridico = db.responsavel_juridico.Find(id);
            db.responsavel_juridico.Remove(responsavel_juridico);
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
