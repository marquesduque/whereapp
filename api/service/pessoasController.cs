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
    public class pessoasController : ApiController
    {
        private db db = new db();

        public class view
        {
            public view()
            {
                meusitens = new List<meuiten>();
                grupos = new List<grupo>();
                cartoes = new List<cartao>();
                notificacoes = new List<notificacao>();
            }
            public int id { get; set; }
            public string nome { get; set; }
            public string cpf { get; set; }
            public string rg { get; set; }
            public string telefone { get; set; }
            public string celular { get; set; }
            public string email { get; set; }
            public string genero { get; set; }
            public string data_nascimento { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string  bairro { get; set; }
            public string cep { get; set; }
            public string cidade { get; set; }
            public string estado { get; set; }
            public string pais { get; set; }
            public string senha { get; set; }
            public int perfil_id { get; set; }
            public string cnpj { get; set; }
            public string razao_social { get; set; }
            public string filial { get; set; }
            public string grupo_empresa { get; set; }
            public string franqueador { get; set; }
            public string franqueado { get; set; }
            public decimal lat_celular { get; set; }
            public decimal lon_celular { get; set; }
            public int num_notificacao { get; set; }
            public string foto_str { get; set; }
            public List<meuiten> meusitens { get; set; }
            public List<grupo> grupos { get; set; }
            public List<cartao> cartoes { get; set; }
            public List<notificacao> notificacoes { get; set; }

            public class notificacao
            {
                public int id { get; set; }
                public string mensagem_previa { get; set; }
                public string mensagem { get; set; }
                public string data { get; set; }
                public int lido { get; set; }
            }

            public class meuiten
            {
                public int id { get; set; }
                public int tipo { get; set; }
                public string nome { get; set; }
                public string cor { get; set; }
                public string raca { get; set; }
                public string nascimento { get; set; }
                public int responsavel_id { get; set; }
                public decimal valor { get; set; }
                public string descricao { get; set; }
                public int perdido { get; set; }
                public int rastreador { get; set; }
                public string fabricante { get; set; }
                public string marca { get; set; }
                public string num_serie { get; set; }
                public string modelo { get; set; }
            }

            public class grupo
            {
                public grupo()
                {
                }
                public int id { get; set; }
                public string nome { get; set; }
                public string descricao { get; set; }

            }

            public class cartao
            {
                public int id { get; set; }
            }
            
        }

        // GET api/pessoas/5
        [ResponseType(typeof(List<pessoa>))]
        public IHttpActionResult Getpessoa(string email, string password, string push_id = null, string plataforma = null)//
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
                else if(pessoa.perfil_id != 3)
                {
                    return Ok(1);
                }
                else
                {
                    if (plataforma != null && (push_id != null && push_id != pessoa.push_id))
                    {
                        var arn = new Utility.SNS().CreatePushEndpoint(push_id, Convert.ToInt32(plataforma));

                        pessoa.push_arn = arn;
                        pessoa.push_id = push_id;

                        db.Entry(pessoa).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    v.id = pessoa.id;
                    v.nome = pessoa.nome;
                    v.cpf = pessoa.cpf;
                    v.rg = pessoa.rg;
                    v.telefone = pessoa.phone == null ? "" : pessoa.phone;
                    v.celular = pessoa.mobile == null ? "" : pessoa.mobile;
                    v.email = pessoa.email;
                    v.genero = pessoa.genero == null ? "null" : pessoa.genero == true ? "true" : "false";
                    v.data_nascimento = pessoa.birthday == null ? "" : pessoa.birthday.Value.ToString("dd/MM/yyyy");
                    v.rua = pessoa.rua;
                    v.numero = pessoa.numero;
                    v.complemento = pessoa.complemento;
                    v.bairro = pessoa.bairro;
                    v.cep = pessoa.cep;
                    v.cidade = pessoa.cidade;
                    v.estado = pessoa.estado;
                    v.pais = pessoa.pais;
                    v.senha = pessoa.password;
                    v.perfil_id = pessoa.perfil_id.Value;
                    v.lat_celular = pessoa.lat_celular == null ? 0 : pessoa.lat_celular.Value;
                    v.lon_celular = pessoa.lon_celular == null ? 0 : pessoa.lon_celular.Value;
                    v.num_notificacao = db.notificacao.Where(c => c.pessoa_id == pessoa.id && c.lido == false).Count();
                    v.foto_str = pessoa.photo == null ? "" : System.Text.Encoding.UTF8.GetString(pessoa.photo).Replace(" ", "+"); ;

                    foreach (var item in db.item.Where(c => c.responsavel_id == pessoa.id && c.ativo == true).ToList())
                    {
                        view.meuiten vMeuItem = new view.meuiten();

                        vMeuItem.id = item.id;
                        vMeuItem.tipo = item.tipo_id == null ? 0 : item.tipo_id.Value;
                        vMeuItem.nome = item.nome;
                        vMeuItem.cor = item.cor;
                        vMeuItem.raca = item.raca;
                        vMeuItem.nascimento = item.nascimento == null ? "" : item.nascimento.Value.ToString("dd/MM/yyyy"); ;
                        vMeuItem.responsavel_id = item.responsavel_id == null ? 0 : item.responsavel_id.Value; ;
                        vMeuItem.valor = item.valor == null ? 0 : item.valor.Value;
                        vMeuItem.descricao = item.descricao;
                        vMeuItem.perdido = item.perdido == true ? 1 : 0;
                        vMeuItem.fabricante = item.fabricante;
                        vMeuItem.modelo = item.modelo;
                        vMeuItem.marca = item.marca;
                        vMeuItem.num_serie = item.num_serie;
                        vMeuItem.rastreador = db.rastreador.Where(c => c.item_id == item.id).FirstOrDefault() == null ? 0 : 1;

                        v.meusitens.Add(vMeuItem);
                    }

                    foreach (var item in db.grupo_pessoa.Include(c => c.grupo).Where(c => c.pessoa_id == pessoa.id && c.ativo == true).ToList())
                    {

                        view.grupo vGrupo = new view.grupo();

                        vGrupo.id = item.grupo.id;
                        vGrupo.nome = item.grupo.nome;
                        vGrupo.descricao = item.grupo.descricao;
                        
                        v.grupos.Add(vGrupo);
                    }

                    foreach (var item in db.notificacao.Where(c => c.pessoa_id == pessoa.id).ToList())
                    {
                        view.notificacao vNotificacao = new view.notificacao();

                        vNotificacao.id = item.id;
                        for (var i = 0; i < item.mensagem.Split(' ').Length; i++)
                        {
                            if (i <= 9)
                            {
                                if (i == (item.mensagem.Split(' ').Length - 1))
                                {
                                    vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i];
                                }
                                else if (i == 9)
                                {
                                    vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i] + "...";
                                }
                                else
                                {
                                    vNotificacao.mensagem_previa += item.mensagem.Split(' ')[i] + " ";
                                }
                            }
                            else
                            {
                                break;
                            }
                        }
                        vNotificacao.mensagem = item.mensagem;
                        vNotificacao.data = item.data == null ? "" : item.data.Value.ToString("dd/MM/yy");
                        vNotificacao.lido = item.lido == null ? 0 : item.lido == false ? 0 : 1;

                        v.notificacoes.Add(vNotificacao);
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

        // PUT api/pessoas/5
        public IHttpActionResult Putpessoa(int id, pessoa pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pessoa.id)
            {
                return BadRequest();
            }

            db.Entry(pessoa).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!pessoaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
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
                pessoas.birthday = Convert.ToDateTime(pessoas.data_aniversario);

                if (pessoas.foto_str != null)
                {
                    pessoas.photo = System.Text.Encoding.UTF8.GetBytes(pessoas.foto_str.Replace(" ", "+"));
                    pessoas.photo_itype = pessoas.foto_itype;
                }
                

                db.pessoa.Add(pessoas);
                db.SaveChanges();

                v.id = pessoas.id;
                v.nome = pessoas.nome;
                v.cpf = pessoas.cpf;
                v.rg = pessoas.rg;
                v.telefone = pessoas.phone;
                v.celular = pessoas.mobile;
                v.email = pessoas.email;
                v.genero = pessoas.genero == null ? "null" : pessoas.genero == true ? "true" : "false";
                v.data_nascimento = pessoas.birthday == null ? "" : pessoas.birthday.Value.ToString("dd/MM/yy");
                v.rua = pessoas.rua;
                v.numero = pessoas.numero;
                v.complemento = pessoas.complemento;
                v.bairro = pessoas.bairro;
                v.cep = pessoas.cep;
                v.cidade = pessoas.cidade;
                v.estado = pessoas.estado;
                v.pais = pessoas.pais;
                v.senha = pessoas.password;

                var endereco = pessoas.cidade + " " + pessoas.bairro + ", " + pessoas.rua + " " + pessoas.numero;


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