using api.Models;
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
    public class loginEmpresaController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                meusitens = new List<meuiten>();
                responsaveis = new List<responsavel>();
            }
            public int id { get; set; }
            public string email { get; set; }
            public string senha { get; set; }
            public string nome { get; set; }
            public string razao_social { get; set; }
            public string cnpj { get; set; }
            public string grupo { get; set; }
            public string filial { get; set; }
            public string franqueador { get; set; }
            public string franqueado { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string cidade { get; set; }
            public string estado { get; set; }
            public string pais { get; set; }
            public string foto { get; set; }
            public string foto_itype { get; set; }
            public int perfil_id { get; set; }
            public List<meuiten> meusitens { get; set; }
            public List<responsavel> responsaveis { get; set; }

            public class meuiten
            {
                public int id { get; set; }
                public string nome { get; set; }
                public decimal valor { get; set; }
                public string descricao { get; set; }
                public int estoque { get; set; }
            }

            public class responsavel
            {
                public int id { get; set; }
                public string nome { get; set; }
                public string email { get; set; }
                public string cpf { get; set; }
                public string rg { get; set; }
                public string telefone { get; set; }
                public string celular { get; set; }
                public string cargo_posicao { get; set; }
                public int porcentagem { get; set; }
            }
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Getpessoa(string email, string password)
        {
            if (email == null || password == null || email.Trim() == "" || password.Trim() == "")
            {
                return Ok(0);
            }
            else
            {
                view v = new view();
                var pessoa = db.pessoa.Where(c => c.email == email && c.password == password).FirstOrDefault();

                if (pessoa == null)
                {
                    return Ok(0);
                }
                else if (pessoa.perfil_id == 1)
                {
                    return Ok(0);
                }
                else
                {
                    v.id = pessoa.id;
                    v.email = pessoa.email;
                    v.senha = pessoa.password;
                    v.nome = pessoa.nome;
                    v.razao_social = pessoa.razao_social;
                    v.cnpj = pessoa.cnpj;
                    v.grupo = pessoa.grupo;
                    v.filial = pessoa.filial;
                    v.franqueador = pessoa.franqueador;
                    v.franqueado = pessoa.franqueado;
                    v.rua = pessoa.rua;
                    v.numero = pessoa.numero;
                    v.complemento = pessoa.complemento;
                    v.bairro = pessoa.bairro;
                    v.cep = pessoa.cep;
                    v.cidade = pessoa.cidade;
                    v.estado = pessoa.estado;
                    v.pais = pessoa.pais;
                    v.foto_itype = pessoa.photo_itype == null ? "" : pessoa.photo_itype;
                    v.foto = pessoa.photo == null ? "" : System.Text.Encoding.UTF8.GetString(pessoa.photo).Replace(" ", "+");
                    v.perfil_id = pessoa.perfil_id.Value;

                    foreach (var item in db.item.Where(c => c.responsavel_id == pessoa.id).ToList())
                    {
                        view.meuiten vMeuItem = new view.meuiten();

                        vMeuItem.id = item.id;
                        vMeuItem.nome = item.nome;
                        vMeuItem.valor = item.valor == null ? 0 : item.valor.Value;
                        vMeuItem.descricao = item.descricao;
                        vMeuItem.estoque = item.estoque == null ? 0 : item.estoque.Value;

                        v.meusitens.Add(vMeuItem);
                    }

                    foreach (var item in db.responsavel_juridico.Where(c => c.pessoa_id == pessoa.id).ToList())
                    {
                        view.responsavel vResponsavel = new view.responsavel();

                        //public int id { get; set; }
                        //public string nome { get; set; }
                        //public string email { get; set; }
                        //public string cpf { get; set; }
                        //public string rg { get; set; }
                        //public string telefone { get; set; }
                        //public string celular { get; set; }
                        //public string cargo_posicao { get; set; }
                        //public int porcentagem { get; set; }

                        vResponsavel.id = item.id;
                        vResponsavel.nome = item.nome;
                        vResponsavel.email = item.email;
                        vResponsavel.cpf = item.cpf;
                        vResponsavel.rg = item.rg;
                        vResponsavel.telefone = item.telefone;
                        vResponsavel.celular = item.celular;
                        vResponsavel.cargo_posicao = item.cargo_posicao;
                        vResponsavel.porcentagem = item.porcentagem == null ? 0 : item.porcentagem.Value;

                        v.responsaveis.Add(vResponsavel);
                    }
                    
                    return Ok(v);
                }
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
        }
        
        // DELETE api/pessoas/5
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Deletepessoa(int id)
        {
            pessoa pessoa = db.pessoa.Find(id);
            if (pessoa == null)
            {
                return NotFound();
            }

            db.pessoa.Remove(pessoa);
            db.SaveChanges();

            return Ok(pessoa);
        }


        [HttpGet]
        [System.Web.Mvc.OutputCache(Duration = 100000, VaryByParam = "none")]
        public HttpResponseMessage GetFoto(int pessoa_id)
        {

            try
            {
                var foto = db.pessoa.Find(pessoa_id).photo;
                if (foto != null)
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                    response.Content = new ByteArrayContent(foto);
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                    response.Headers.CacheControl = new CacheControlHeaderValue()
                    {
                        Public = true,
                        MaxAge = new TimeSpan(1, 0, 0, 0)
                    };
                    return response;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
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

        private bool pessoaExists(int id)
        {
            return db.pessoa.Count(e => e.id == id) > 0;
        }
    }
}