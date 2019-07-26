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
    public class pessoasController : Controller
    {
        private db db = new db();

		public class find : Models.pessoa
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
        }

        public JsonResult Find(find ent)
        {
            var list = db.pessoa.Where(c =>
                                    (ent.id == 0 || c.id == ent.id) &&

                                    (ent.nome == null || c.nome == ent.nome) &&
                                    (ent.email == null || c.email == ent.email) &&
                                    (ent.birthday == null || c.birthday == ent.birthday) &&
                                    (ent.facebook == null || c.facebook == ent.facebook) &&
                                    (ent.cpf == null || c.cpf == ent.cpf) &&
                                    (ent.rg == null || c.rg == ent.rg) &&
                                    (ent.perfil_id == null || c.perfil_id == ent.perfil_id) &&
                                    (ent.phone == null || c.phone == ent.phone) &&
                                    (ent.phone_optional == null || c.phone_optional == ent.phone_optional) &&
                                    (ent.mobile == null || c.mobile == ent.mobile) &&
                                    (ent.mobile_optional == null || c.mobile_optional == ent.mobile_optional) &&
                                    (ent.rating == null || c.rating == ent.rating) &&
                                    (ent.password == null || c.password == ent.password) &&
                                    (ent.description == null || c.description == ent.description) &&
                                    (ent.charge == null || c.charge == ent.charge) &&
                                    (ent.email_change == null || c.email_change == ent.email_change) &&
                                    (ent.status_usuario_id == null || c.status_usuario_id == ent.status_usuario_id) &&
                                    (ent.push_id == null || c.push_id == ent.push_id) &&
                                    (ent.push_arn == null || c.push_arn == ent.push_arn) &&
                                    (ent.credit == null || c.credit == ent.credit) &&
                                    (ent.cnpj == null || c.cnpj == ent.cnpj) &&
                                    (ent.razao_social == null || c.razao_social == ent.razao_social) &&
                                    (ent.place_id == null || c.place_id == ent.place_id) &&
                                    (ent.Agencia == null || c.Agencia == ent.Agencia) &&
                                    (ent.AgenciaDv == null || c.AgenciaDv == ent.AgenciaDv) &&
                                    (ent.Conta == null || c.Conta == ent.Conta) &&
                                    (ent.ContaDv == null || c.ContaDv == ent.ContaDv) &&
                                    (ent.BankCode == null || c.BankCode == ent.BankCode) &&
                                    (ent.DocumentNumber == null || c.DocumentNumber == ent.DocumentNumber) &&
                                    (ent.LegalName == null || c.LegalName == ent.LegalName) &&
                                    (ent.comissao == null || c.comissao == ent.comissao) &&
                                    (ent.pagarme_id == null || c.pagarme_id == ent.pagarme_id) &&
                                    (ent.created == null || c.created == ent.created) &&
                                    (ent.external_id == null || c.external_id == ent.external_id) &&
                                    (ent.filial_id == null || c.filial_id == ent.filial_id) &&
                                    (ent.genero == null || c.genero == ent.genero) &&
                                    (ent.BankToken == null || c.BankToken == ent.BankToken) &&
                                    (ent.especialidade_id == null || c.especialidade_id == ent.especialidade_id) &&
                                    (ent.lat == null || c.lat == ent.lat) &&
                                    (ent.lng == null || c.lng == ent.lng) &&
                                    (ent.rua == null || c.rua == ent.rua) &&
                                    (ent.numero == null || c.numero == ent.numero) &&
                                    (ent.complemento == null || c.complemento == ent.complemento) &&
                                    (ent.cidade == null || c.cidade == ent.cidade) &&
                                    (ent.pais == null || c.pais == ent.pais) &&
                                    (ent.cep == null || c.cep == ent.cep) &&
                                    (ent.bairro == null || c.bairro == ent.bairro) &&
                                    (ent.estado == null || c.estado == ent.estado) &&
                                    (ent.grupo == null || c.grupo == ent.grupo) &&
                                    (ent.filial == null || c.filial == ent.filial) &&
                                    (ent.franqueador == null || c.franqueador == ent.franqueador) &&
                                    (ent.franqueado == null || c.franqueado == ent.franqueado) &&
                                    (ent.lat_celular == null || c.lat_celular == ent.lat_celular) &&
                                    (ent.lon_celular == null || c.lon_celular == ent.lon_celular) &&
                                    (ent.data_localizacao == null || c.data_localizacao == ent.data_localizacao) &&
                                    (c.active != false)
                        ).Select(c => new {

                            id = c.id,
                            nome = c.nome,
                            email = c.email,
                            cpf = c.cpf,
                            rg = c.rg,
                            perfil_id = c.perfil_id == 1 ? "Administrador" : c.perfil_id == 2 ? "Loja" : c.perfil_id == 3 ? "Usuário APP" : "",
                            phone = c.phone,
                            mobile = c.mobile

                        }).OrderByDescending(c => c.id).Skip((ent.Page) * ent.PageSize).Take(ent.PageSize).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /pessoas/
        public ActionResult Index(int perfil_id)
        {
            return View(new Site.Models.Find<api.Controllers.pessoasController.find>() { });
            return View(new Site.Models.Find<find>() { });
            var pessoa = db.pessoa.Include(p => p.perfil).Include(p => p.status_usuario);

            return View(new Site.Models.Find<find>() { });
            return View(pessoa.ToList());
        }

        // GET: /pessoas/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pessoa pessoa = db.pessoa.Find(id);
            if (pessoa == null)
            {
                return HttpNotFound();
            }
            return View(pessoa);
        }

        // GET: /pessoas/Create
        public ActionResult Create(int perfil_id)
        {                       
                   return View(new pessoa() { perfil_id = perfil_id, active = true });
        }

        // POST: /pessoas/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(pessoa pessoa)
        {

            if (db.pessoa.Where(c => c.email.ToLower().Trim() == pessoa.email.ToLower().Trim()).Count() > 0)
            {
                ModelState.AddModelError("email", "Este email já está sendo utilizado, digite outro.");
            }

            if (pessoa.foto_site != null)
            {
                pessoa.photo = System.Text.Encoding.UTF8.GetBytes(pessoa.foto_site.Replace(" ", "+"));
            }

            if (ModelState.IsValid)
            {
                pessoa.created = DateTime.Now;
                db.pessoa.Add(pessoa);
                db.SaveChanges();
                return RedirectToAction("Index", new { perfil_id = pessoa.perfil_id });
            }

            
            
            return View(pessoa);
        }

        // GET: /pessoas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pessoa pessoa = db.pessoa.Find(id);
            if (pessoa == null)
            {
                return HttpNotFound();
            }
            
            
            return View(pessoa);
        }

        // POST: /pessoas/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(pessoa pessoa)
        {
            if (pessoa.foto_site != null)
            {
                pessoa.photo = System.Text.Encoding.UTF8.GetBytes(pessoa.foto_site.Replace(" ", "+"));
            }

            if (ModelState.IsValid)
            {
                db.Entry(pessoa).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", new { perfil_id = pessoa.perfil_id });
            }
            
            
            return View(pessoa);
        }

        // GET: /pessoas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            pessoa pessoa = db.pessoa.Find(id);
            if (pessoa == null)
            {
                return HttpNotFound();
            }
            return View(pessoa);
        }

        // POST: /pessoas/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            pessoa pessoa = db.pessoa.Find(id);
            pessoa.active = false;
            db.Entry(pessoa).State = EntityState.Modified;
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
