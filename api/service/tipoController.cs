﻿using api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace api
{
    public class tipoController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
            }
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Gettipos()//
        {
            var tipo = db.tipo.ToList();
            return Ok(tipo);

        }

        //List<pessoa> pessoa = new List<pessoa>();
        //if (Models.db.place.place_id.ToString() == password)
        //{
        //    pessoa = db.pessoa.Where(c => c.place_id == Models.db.place.place_id && c.password == email).ToList();
        //}
        //else
        //{
        //    pessoa = db.pessoa.Where(c => c.place_id == Models.db.place.place_id && c.email == email && c.password == password).ToList();
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}