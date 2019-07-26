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
    public class itemsController : Controller
    {
        private db db = new db();

		public class find : Models.item
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.item.Include(c => c.pessoa).Include(c => c.pessoa1).Where(c=>
									(ent.id == 0 || c.id == ent.id) &&
					
									(ent.nome == null || c.nome.ToLower().Contains(ent.nome.ToLower())) &&
									(ent.cor == null || c.cor == ent.cor) &&
									(ent.raca == null || c.raca == ent.raca) &&
									(ent.sangue == null || c.sangue == ent.sangue) &&
									(ent.nascimento == null || c.nascimento == ent.nascimento) &&
									(ent.pelo == null || c.pelo == ent.pelo) &&
                                    (ent.doacao == null || c.doacao == ent.doacao) &&
                                    (ent.apadrinhar == null || c.apadrinhar == ent.apadrinhar) &&
                                    (ent.vacinas == null || c.vacinas == ent.vacinas) &&
									(ent.responsavel_id == null || c.responsavel_id == ent.responsavel_id) &&
									(ent.valor == null || c.valor == ent.valor) &&
									(ent.tipo_id == null || c.tipo_id == ent.tipo_id) &&
									(ent.cnpj == null || c.cnpj == ent.cnpj) &&
									(ent.cpf == null || c.cpf == ent.cpf) &&
									(c.ativo == true) &&
									(ent.rastreado == null || c.pessoa1.nome.ToLower().Contains(ent.rastreado.ToLower())) &&
									(ent.descricao == null || c.descricao == ent.descricao) &&
									(ent.perdido == null || c.perdido == ent.perdido) &&
                                    (ent.marca == null || c.marca.ToLower().Contains(ent.marca.ToLower())) &&
                                    (ent.estoque == null || c.estoque == ent.estoque)
                                    ).Select(c => new
                                    {
                                        id = c.id,
                                        nome = c.nome,
                                        responsavel_id = c.pessoa.nome,
                                        tipo_id = c.tipo.nome,
                                        ativo = c.ativo == true ? "Sim" : "Não",
                                        rastreado_id = c.pessoa1.nome,
                                        descricao = c.descricao,
                                        perdido = c.perdido == true ? "Sim" : "Não",
                                        doacao = c.doacao == true ? "Sim" : c.doacao == false ? "Não" : "",
                                        apadrinhar = c.apadrinhar == true ? "Sim" : c.apadrinhar == false ? "Não" : "",
                                        valor = c.valor,
                                        estoque = c.estoque,
                                        marca = c.marca
                                    }
			            ).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /items/
        public ActionResult Index(int? tipo_id)
        {
            if(tipo_id == null)
            {
                return View(new Site.Models.Find<api.Controllers.itemsController.find>() { });
                return View(new Site.Models.Find<find>() { });
                var item = db.item.Include(p => p.tipo).Include(p => p.pessoa);

                return View(new Site.Models.Find<find>() { });
                return View(item.ToList());
            }
            else
            {
                var filter = new Site.Models.Find<api.Controllers.itemsController.find>();
                filter.Filter = new find();
                filter.Filter.tipo_id = tipo_id;
                filter.Filter.responsavel_id = Utility.Session.Login.Id;
                return View(filter);
            }
        }

        // GET: /items/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            item item = db.item.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }

        public ActionResult DoarItem(int id)
        {
            item item = db.item.Find(id);
            item.doacao = true;
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        // GET: /items/Create
        public ActionResult Create(int tipo_id)
        {            
                   return View(new item() { ativo = true, perdido = false, tipo_id = tipo_id });
        }

        // POST: /items/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(item item)
        {
            if (item.foto_site != null)
            {
                item.photo = System.Text.Encoding.UTF8.GetBytes(item.foto_site.Replace(" ", "+"));
            }

            if (ModelState.IsValid)
            {
                item.doacao = false;
                item.apadrinhar = false;
                db.item.Add(item);
                db.SaveChanges();
                if (Request.QueryString["tipo_id"] == null)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return RedirectToAction("Index", new { tipo_id = Request.QueryString["tipo_id"] });
                }
            }

            
            
            
            return View(item);
        }

        // GET: /items/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            item item = db.item.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            
            
            
            return View(item);
        }

        // POST: /items/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(item item)
        {
            if (item.foto_site != null)
            {
                item.photo = System.Text.Encoding.UTF8.GetBytes(item.foto_site.Replace(" ", "+"));
            }

            if (ModelState.IsValid)
            {
                db.Entry(item).State = EntityState.Modified;
                db.SaveChanges();
                if (Request.QueryString["tipo_id"] == null)
                {
                    return RedirectToAction("Index");

                }
                else
                {
                    return RedirectToAction("Index", new { tipo_id = Request.QueryString["tipo_id"] });

                }
            }
            
            
            
            return View(item);
        }

        // GET: /items/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            item item = db.item.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }

        // POST: /items/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            item item = db.item.Find(id);
            //db.item.Remove(item);
            item.ativo = false;
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
            if (Request.QueryString["tipo_id"] == null)
            {

                return Json(new { redirect = Url.Action("Index") });
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { redirect = Url.Action("Index", new { tipo_id = Request.QueryString["tipo_id"] }) });
                return RedirectToAction("Index", new { tipo_id = Request.QueryString["tipo_id"] });
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
