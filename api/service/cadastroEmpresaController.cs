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
    public class cadastroEmpresaController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                meusitens = new List<meuiten>();
                compras = new List<compra>();
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
            public List<compra> compras { get; set; }
            public List<responsavel> responsaveis { get; set; }

            public class meuiten
            {
                public int id { get; set; }
                public string nome { get; set; }
                public decimal valor { get; set; }
                public string photo { get; set; }
                public string photo_itype { get; set; }
                public string descricao { get; set; }
                public int estoque { get; set; }
            }

            public class compra
            {
                public compra()
                {
                    itens = new List<item>();
                }
                public int id { get; set; }
                public string nome { get; set; }
                public string rg { get; set; }
                public string cpf { get; set; }
                public string telefone { get; set; }
                public string celular { get; set; }

                public List<item> itens { get; set; }

                public class item
                {
                    public int id { get; set; }
                    public string nome { get; set; }
                    public string foto { get; set; }
                    public string foto_itype { get; set; }
                    public decimal valor { get; set; }
                    public int quantidade { get; set; }
                }
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
        
        // POST api/pessoas
        [ResponseType(typeof(pessoa))]
        public IHttpActionResult Postpessoa(pessoa pessoas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (db.pessoa.Count(c => c.email == pessoas.email) > 0)
            {
                if(pessoas.id != 0)
                {
                    var p = db.pessoa.Find(pessoas.id);
                    p.active = true;
                    if (pessoas.foto_str != null)
                    {
                        p.photo = System.Text.Encoding.UTF8.GetBytes(pessoas.foto_str.Replace(" ", "+"));
                        p.photo_itype = pessoas.foto_itype;
                    }
                    
                    p.email = pessoas.email;
                    p.password = pessoas.password;
                    p.nome = pessoas.nome;
                    p.razao_social = pessoas.razao_social;
                    p.cnpj = pessoas.cnpj;
                    p.grupo = pessoas.grupo;
                    p.filial = pessoas.filial;
                    p.franqueador = pessoas.franqueador;
                    p.franqueado = pessoas.franqueado;
                    p.rua = pessoas.rua;
                    p.numero = pessoas.numero;
                    p.complemento = pessoas.complemento;
                    p.bairro = pessoas.bairro;
                    p.cep = pessoas.cep;
                    p.cidade = pessoas.cidade;
                    p.estado = pessoas.estado;
                    p.pais = pessoas.pais;
                    p.perfil_id = pessoas.perfil_id.Value;

                    db.Entry(p).State = EntityState.Modified;
                    db.SaveChanges();

                    view v = new view();

                    v.id = pessoas.id;
                    v.email = pessoas.email;
                    v.senha = pessoas.password;
                    v.nome = pessoas.nome;
                    v.razao_social = pessoas.razao_social;
                    v.cnpj = pessoas.cnpj;
                    v.grupo = pessoas.grupo;
                    v.filial = pessoas.filial;
                    v.franqueador = pessoas.franqueador;
                    v.franqueado = pessoas.franqueado;
                    v.rua = pessoas.rua;
                    v.numero = pessoas.numero;
                    v.complemento = pessoas.complemento;
                    v.bairro = pessoas.bairro;
                    v.cep = pessoas.cep;
                    v.cidade = pessoas.cidade;
                    v.estado = pessoas.estado;
                    v.pais = pessoas.pais;
                    v.foto_itype = pessoas.photo_itype == null ? "" : pessoas.photo_itype;
                    v.foto = pessoas.photo == null ? "" : System.Text.Encoding.UTF8.GetString(pessoas.photo).Replace(" ", "+");
                    v.perfil_id = pessoas.perfil_id.Value;


                    return Ok(v);
                }
                return Ok(0);
            }
            else
            {
                view v = new view();

                if (pessoas.push_id != null && pessoas.plataforma != null)
                {
                    var arn = new Utility.SNS().CreatePushEndpoint(pessoas.push_id, Convert.ToInt32(pessoas.plataforma));

                    pessoas.push_arn = arn;
                }

                pessoas.created = DateTime.Now;
                pessoas.active = true;
                if(pessoas.foto_str != null)
                {
                    pessoas.photo = System.Text.Encoding.UTF8.GetBytes(pessoas.foto_str.Replace(" ", "+"));
                    pessoas.photo_itype = pessoas.foto_itype;
                }

                db.pessoa.Add(pessoas);
                db.SaveChanges();

                v.id = pessoas.id;
                v.email = pessoas.email;
                v.senha = pessoas.password;
                v.nome = pessoas.nome;
                v.razao_social = pessoas.razao_social;
                v.cnpj = pessoas.cnpj;
                v.grupo = pessoas.grupo;
                v.filial = pessoas.filial;
                v.franqueador = pessoas.franqueador;
                v.franqueado = pessoas.franqueado;
                v.rua = pessoas.rua;
                v.numero = pessoas.numero;
                v.complemento = pessoas.complemento;
                v.bairro = pessoas.bairro;
                v.cep = pessoas.cep;
                v.cidade = pessoas.cidade;
                v.estado = pessoas.estado;
                v.pais = pessoas.pais;
                v.foto_itype = pessoas.photo_itype == null ? "" : pessoas.photo_itype;
                v.foto = pessoas.photo == null ? "" : System.Text.Encoding.UTF8.GetString(pessoas.photo).Replace(" ", "+");
                v.perfil_id = pessoas.perfil_id.Value;


                return Ok(v);
            }
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