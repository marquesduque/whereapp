using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using api.Models;
using Newtonsoft;

namespace api.Controllers
{
    public class biblioteca_de_palavraController : Controller
    {
        private db db = new db();

        public class find : Models.biblioteca_de_palavra
        {
            public int Page { get; set; }
            public int PageSize { get { return 30; } }
            public string isColumn { get { return (col == true ? "Sim" : "Não"); } }
        }

        public JsonResult Find(find ent)
        {
            string path = Server.MapPath("~/library.json");
            List<find> arrlibrary = Newtonsoft.Json.JsonConvert.DeserializeObject<List<find>>(System.IO.File.ReadAllText(path));
            var list = arrlibrary.ToList();
            for(int i=0; i< list.Count; i++)
            {
                list[i].id = i;
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        // GET: /biblioteca_de_palavra/
        public ActionResult Index()
        {
            return View(new Site.Models.Find<api.Controllers.biblioteca_de_palavraController.find>() { });
        }

        // GET: /biblioteca_de_palavra/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            biblioteca_de_palavra biblioteca_de_palavra = db.biblioteca_de_palavra.Find(id);
            if (biblioteca_de_palavra == null)
            {
                return HttpNotFound();
            }
            return View(biblioteca_de_palavra);
        }

        // GET: /biblioteca_de_palavra/Create
        public ActionResult Create()
        {
            return View();
        }
        
        // POST: /biblioteca_de_palavra/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Create(biblioteca_de_palavra biblioteca_de_palavra)
        {
            if (ModelState.IsValid)
            {
                string path = Server.MapPath("~/library.json");
                if (!System.IO.File.Exists(path))
                {
                    System.IO.File.WriteAllText(path, "[]");
                }
                List<biblioteca_de_palavra> arrlibrary = Newtonsoft.Json.JsonConvert.DeserializeObject<List<biblioteca_de_palavra>>(System.IO.File.ReadAllText(path));
                if (arrlibrary.Count(c => c.name == biblioteca_de_palavra.name) > 0)
                {
                    var library = arrlibrary.Single(c => c.name == biblioteca_de_palavra.name);
                    library.description = biblioteca_de_palavra.description;
                    library.col = biblioteca_de_palavra.col;
                    library.col_description = biblioteca_de_palavra.col_description;
                    library.size = biblioteca_de_palavra.size;                    
                }
                else
                {
                    arrlibrary.Add(biblioteca_de_palavra);
                }

                System.IO.File.WriteAllText(path, Newtonsoft.Json.JsonConvert.SerializeObject(arrlibrary));

            }

            return Json(biblioteca_de_palavra);
        }

        // GET: /biblioteca_de_palavra/Edit/5
        public ActionResult Edit(int id)
        {

            string path = Server.MapPath("~/library.json");
            List<biblioteca_de_palavra> arrlibrary = Newtonsoft.Json.JsonConvert.DeserializeObject<List<biblioteca_de_palavra>>(System.IO.File.ReadAllText(path));

            if (arrlibrary == null)
            {
                return HttpNotFound();
            }
            arrlibrary[id].id = id;
            return View(arrlibrary[id]);
        }

        // POST: /biblioteca_de_palavra/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(biblioteca_de_palavra biblioteca_de_palavra)
        {
            if (ModelState.IsValid)
            {
                string path = Server.MapPath("~/library.json");
                List<biblioteca_de_palavra> arrlibrary = Newtonsoft.Json.JsonConvert.DeserializeObject<List<biblioteca_de_palavra>>(System.IO.File.ReadAllText(path));
                arrlibrary[biblioteca_de_palavra.id] = biblioteca_de_palavra;

                System.IO.File.WriteAllText(path, Newtonsoft.Json.JsonConvert.SerializeObject(arrlibrary));

                return RedirectToAction("Index");
            }
            return View(biblioteca_de_palavra);
        }

        // GET: /biblioteca_de_palavra/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            biblioteca_de_palavra biblioteca_de_palavra = db.biblioteca_de_palavra.Find(id);
            if (biblioteca_de_palavra == null)
            {
                return HttpNotFound();
            }
            return View(biblioteca_de_palavra);
        }

        // POST: /biblioteca_de_palavra/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            string path = Server.MapPath("~/library.json");
            List<biblioteca_de_palavra> arrlibrary = Newtonsoft.Json.JsonConvert.DeserializeObject<List<biblioteca_de_palavra>>(System.IO.File.ReadAllText(path));
            arrlibrary.RemoveAt(id);

            System.IO.File.WriteAllText(path, Newtonsoft.Json.JsonConvert.SerializeObject(arrlibrary));

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
