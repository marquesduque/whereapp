//using api.Models;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Text;
//using System.Web;

//namespace api.Pagamento
//{
//    public class paggi
//    {
//        public string ErrorMessage { get; set; }
        
//        private static string token = "#716744ca-9dcf-4afe-85d3-c410a42d4680";
//        private static string address = "https://api-online.paggi.com/api/v4";

//        //private static string address = "https://api-online.stg.paggi.com/api/v4";
//        //private static string token = "dec506c1-70eb-4dc5-bdc9-d9e18f96cff4";

//        public paggi(string Token)
//        {
//            if (Token != null)
//            {
//                if (Token.Contains("#"))
//                {
//                    address = "https://api-online.stg.paggi.com/api/v4";
//                }
//                token = Token.Replace("#", "");
//            }
//            else
//            {
//                if (token.Contains("#"))
//                {
//                    address = "https://api-online.stg.paggi.com/api/v4";
//                }
//                token = token.Replace("#", "");
//            }
//        }

//        public class entity
//        {
//            public class metadata
//            {
//                public string internal_id { get; set; }
//            }
//            public class charges
//            {
//                public charges()
//                {
//                    installments = new List<installment>();
//                    metadata = new metadata();
//                    intermediaries = new List<intermediarie>();
//                }
//                public string status { get; set; }
//                public string statement_descriptor { get; set; }
//                public bool risk_analysis { get; set; }
//                public string receipt_email { get; set; }
//                public metadata metadata { get; set; }
//                public string id { get; set; }
//                public string acquirer_message { get; set; }
//                public string acquirer_code { get; set; }
//                public string expected_compensation { get; set; }
//                public string destination { get; set; }
//                public string description { get; set; }
//                public string customer { get; set; }
//                public string customer_id { get; set; }
//                public string card_id { get; set; }
//                public string created { get; set; }
//                public bool capture { get; set; }
//                public int amount { get; set; }
//                public int installments_number { get; set; }
//                public bool force { get; set; }
//                public List<installment> installments { get; set; }
//                public List<intermediarie> intermediaries { get; set; }

//                public class intermediarie
//                {
//                    public int flat { get; set; }
//                    public string customer_id { get; set; }
//                    public string description { get; set; }
//                }
//                public class installment
//                {
//                    public string status { get; set; }
//                    public string number { get; set; }
//                    public string expected_date { get; set; }
//                    public string amount { get; set; }
//                }
//            }

//            public class address
//            {
//                public string zip { get; set; }
//                public string street { get; set; }
//                public string state { get; set; }
//                public string neighborhood { get; set; }
//                public string country { get; set; }
//                public string city { get; set; }
//            }
//            public class card
//            {
//                public card()
//                {
//                    addresses = new List<address>();
//                    metadata = new metadata();
//                }
//                public int year { get; set; }
//                public string name { get; set; }
//                public string cvv { get; set; }
//                public string number { get; set; }
//                public int month { get; set; }
//                public metadata metadata { get; set; }
//                public string last4 { get; set; }
//                public string id { get; set; }
//                public string card_alias { get; set; }
//                public bool cvc_check { get; set; }
//                public string acquirer_code { get; set; }
//                public string acquirer_message { get; set; }
//                public string brand { get; set; }
//                public string bin { get; set; }
//                public List<address> addresses { get; set; }
//                public bool validate { get; set; }
//                public string customer_id { get; set; }
//                [JsonProperty(PropertyName = "default")]
//                public string default1 { get; set; }
//            }

//            public class customer
//            {
//                public customer()
//                {
//                    addresses = new List<address>();
//                    address = new address();
//                    cards = new List<card>();
//                    card = new card();
//                }
//                public List<error> errors { get; set; }
//                public class error
//                {
//                    public string type { get; set; }
//                    public string param { get; set; }
//                    public string message { get; set; }
//                }
//                public class banks
//                {
//                    public int total { get; set; }
//                    public List<ent> result { get; set; }
//                    public class ent
//                    {
//                        public string id { get; set; }
//                        public string name { get; set; }
//                    }
//                }
//                public class bank_accounts
//                {
//                    public int total { get; set; }
//                    public List<bank_accounts> result { get; set; }
//                    public bank_accounts()
//                    {
//                        bank_id = "";
//                        number = "";
//                        digit = ""; branch = "";

//                        branch_digit = "";
//                        customer_id = "";

//                    }
//                    public string id { get; set; }
//                    public string bank_id { get; set; }
//                    public string number { get; set; }
//                    public string digit { get; set; }
//                    public string branch { get; set; }
//                    public string branch_digit { get; set; }
//                    public string customer_id { get; set; }
//                }

//                public banks bank { get; set; }

//                public string phone { get; set; }
//                public string name { get; set; }
//                public string id { get; set; }
//                public string email { get; set; }
//                public string document { get; set; }
//                public string description { get; set; }
//                public string created { get; set; }
//                public List<card> cards { get; set; }

//                public card card { get; set; }
//                public List<address> addresses { get; set; }
//                public address address { get; set; }
//            }
//        }

//        public class client
//        {
//            private string Method { get; set; }
//            private HttpClient Client { get; set; }

//            public client(methods method)
//            {
//                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
//                HttpClient httpClient = new HttpClient();
//                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
//                if (!string.IsNullOrEmpty(System.Web.HttpContext.Current.Request.Headers["x-forwarded-for"]))
//                    httpClient.DefaultRequestHeaders.Add("x-forwarded-for", System.Web.HttpContext.Current.Request.Headers["x-forwarded-for"]);
//                else
//                    httpClient.DefaultRequestHeaders.Add("x-forwarded-for", System.Web.HttpContext.Current.Request.UserHostAddress);

//                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
//                            Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", token, ""))));
//                Client = httpClient;
//                Method = method.ToString();
//            }

//            public T get<T>(int? id = null, string value = "")
//            {
//                StringBuilder sb = new StringBuilder();
//                sb.Append("::CHAMADA GET::" + DateTime.Now.ToLongDateString() + "::" + address + "/" + Method + (id == null ? "" : "/" + id) + Environment.NewLine);

//                var result = Client.GetAsync(address + "/" + Method + (id == null ? "" : "/" + id)+ value).Result;
//                if (result.StatusCode == HttpStatusCode.OK)
//                {
//                    var contents = result.Content.ReadAsStringAsync().Result;
//                    sb.Append("::RESPOSTA::" + contents);
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();
//                    return JsonConvert.DeserializeObject<T>(contents);
//                }
//                else
//                {
//                    sb.Append("::RESPOSTA::ERRO");
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();
//                    throw new ApplicationException(string.Concat((int)result.StatusCode, " - ", result.ReasonPhrase));
//                }
//            }

//            public string log
//            {
//                get
//                {
//                    if (System.IO.File.Exists(HttpContext.Current.Server.MapPath("~/paggi.log")))
//                    {
//                        return System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/paggi.log"));
//                    }
//                    return "";
//                }
//                set
//                {
//                    try
//                    {
//                        System.IO.File.WriteAllText(HttpContext.Current.Server.MapPath("~/paggi.log"), log + value);
//                    }
//                    catch (Exception ex)
//                    {

//                    }
//                }
//            }
//            public T set<T>(object value)
//            {
//                StringBuilder sb = new StringBuilder();
//                sb.Append("::CHAMADA POST::" + DateTime.Now.ToString() + "::" + address + "/" + Method + Environment.NewLine);
//                var content = new StringContent(JsonConvert.SerializeObject(value).ToString(), Encoding.UTF8, "application/json");
//                sb.Append("::ENVIO::" + JsonConvert.SerializeObject(value).ToString() + Environment.NewLine);

//                var result = Client.PostAsync(address + "/" + Method, content).Result;

//                if (result.StatusCode == HttpStatusCode.OK)
//                {
//                    var contents = result.Content.ReadAsStringAsync().Result;
//                    sb.Append("::RESPOSTA::" + contents);
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();
//                    return JsonConvert.DeserializeObject<T>(contents);
//                }
//                else
//                {
//                    var contents = result.Content.ReadAsStringAsync().Result;

//                    string ContentToString = result.Content.ReadAsStringAsync().Result;
//                    sb.Append("::RESPOSTA::" + ContentToString);
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();

//                    throw new Exception(ContentToString);

//                    return JsonConvert.DeserializeObject<T>(ContentToString);
//                }
//            }
//            public T put<T>(string id, object value)
//            {
//                StringBuilder sb = new StringBuilder();
//                sb.Append("::CHAMADA PUT::" + DateTime.Now.ToString() + "::" + address + "/" + Method + Environment.NewLine);

//                var content = new StringContent(JsonConvert.SerializeObject(value).ToString(), Encoding.UTF8, "application/json");
//                sb.Append("::ENVIO::" + JsonConvert.SerializeObject(value).ToString() + Environment.NewLine);
//                var result = Client.PutAsync(address + "/" + Method + "/" + id, content).Result;

//                if (result.StatusCode == HttpStatusCode.OK)
//                {
//                    var contents = result.Content.ReadAsStringAsync().Result;
//                    sb.Append("::RESPOSTA::" + contents);
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();
//                    return JsonConvert.DeserializeObject<T>(contents);
//                }
//                else
//                {
//                    var contents = result.Content.ReadAsStringAsync().Result;

//                    string ContentToString = result.Content.ReadAsStringAsync().Result;
//                    sb.Append("::RESPOSTA::" + ContentToString);
//                    sb.Append(Environment.NewLine);
//                    sb.Append(Environment.NewLine);
//                    log = sb.ToString();

//                    throw new Exception(ContentToString);

//                    return JsonConvert.DeserializeObject<T>(ContentToString);
//                }
//            }
//        }

//        public enum methods
//        {
//            customers,
//            charges,
//            cards,
//            banks,
//            bank_accounts
//        }

//        public string pessoa(pessoa pessoa, cartao cartao, db db)
//        {
//            entity.customer customer = new entity.customer();

//            customer.name = pessoa.nome;
//            customer.email = pessoa.email;
//            customer.document = cartao.documento;

//            customer.card.name = cartao.nome;
//            customer.card.number = cartao.numero;
//            customer.card.month = Convert.ToInt32(cartao.expiracao.Split('/')[0]);
//            customer.card.year = Convert.ToInt32(cartao.expiracao.Split('/')[1]);
//            customer.card.cvv = cartao.cvv;
//            customer.card.default1 = "true";

//            if (string.IsNullOrEmpty(pessoa.pagarme_id))
//            {
//                var c = new client(methods.customers).set<entity.customer>(customer);
//                pessoa.pagarme_id = c.id;

//                db.Entry(pessoa).State = EntityState.Modified;
//                db.SaveChanges();
//            }
//            else
//            {
//                customer.card.customer_id = pessoa.pagarme_id;
//                customer.card.id = new client(methods.cards).set<entity.card>(customer.card).id;
//                cartao.pagarme_id = customer.card.id;
//            }
//            db.cartao.Add(cartao);
//            db.SaveChanges();

//            return pessoa.pagarme_id;

//        }

//        public void cartao(compra compra, List<pessoa> intermediarios)
//        {
//            db db = new db();


//            if (compra.filial == null)
//            {
//                compra.filial = db.filial.Find(compra.filial_id);
//            }
//            if (compra.valor_frete == null)
//            {
//                compra.valor_frete = 0;
//            }
//            if (compra.desconto == null)
//            {
//                compra.desconto = 0;
//            }
//            if (compra.total == null)
//            {
//                compra.total = 0;
//            }

//            var creait = new Models.delivery_prospectEntities().creait.FirstOrDefault();


//            var cartao = db.cartao.Include("pessoa").OrderByDescending(c => c.id).FirstOrDefault(c => c.pessoa_id == compra.comprador_id);



//            entity.customer customer = new entity.customer();
//            entity.charges charges = new entity.charges();
//            if (string.IsNullOrEmpty(cartao.pessoa.pagarme_id))
//            {
//                customer.name = cartao.pessoa.nome;
//                customer.email = cartao.pessoa.email;
//                customer.document = compra.cartao.documento;

//                customer.card.name = compra.cartao.nome;
//                customer.card.number = compra.cartao.numero;
//                customer.card.month = Convert.ToInt32(compra.cartao.expiracao.Split('/')[0]);
//                customer.card.year = Convert.ToInt32(compra.cartao.expiracao.Split('/')[1]);
//                customer.card.cvv = compra.cartao.cvv;

//                cartao.pessoa.pagarme_id = new client(methods.customers).set<entity.customer>(customer).id;
//                charges.customer_id = cartao.pessoa.pagarme_id;
//            }
//            else
//            {
//                charges.customer_id = cartao.pessoa.pagarme_id;
//            }

//            decimal total = (compra.total.Value + compra.valor_frete.Value - compra.desconto.Value);
//            charges.amount = Convert.ToInt32(total.ToString("f").Replace(",", "")); ;
//            charges.statement_descriptor = Models.db.place.id.ToString();
//            charges.installments_number = 1;
//            charges.capture = true;
//            charges.force = true;
//            charges.card_id = cartao.pagarme_id;

//            entity.customer customer_intermediario = new entity.customer();
//            if (intermediarios != null)
//            {
//                foreach (var intermediario in intermediarios)
//                {
//                    if (intermediario.comissao == null)
//                    {
//                        intermediario.comissao = 1;
//                    }

//                    if (string.IsNullOrEmpty(intermediario.pagarme_id))
//                    {
//                        customer_intermediario.name = intermediario.nome;
//                        customer_intermediario.email = intermediario.email;
//                        customer_intermediario.document = intermediario.DocumentNumber.Replace(".", "").Replace("-", "");
//                        customer_intermediario.card = null;
//                        intermediario.pagarme_id = new client(methods.customers).set<entity.customer>(customer_intermediario).id;

//                        var p = db.pessoa.Find(intermediario.id);
//                        p.pagarme_id = intermediario.pagarme_id;
//                        db.Entry(p).State = EntityState.Modified;
//                        db.SaveChanges();
//                        intermediario.BankToken = null;
//                    }

//                    if (intermediario.BankToken == null)
//                    {
//                        entity.customer.bank_accounts bank = new entity.customer.bank_accounts();
//                        bank.bank_id = intermediario.BankCode;

//                        var banks = new client(methods.banks).get<entity.customer.banks>();
//                        bank.bank_id = banks.result[0].id;



//                        bank.branch = intermediario.Agencia == null ? "" : intermediario.Agencia.PadLeft(5, '0');
//                        bank.branch_digit = intermediario.AgenciaDv == null ? "" : intermediario.AgenciaDv;
//                        bank.number = intermediario.Conta == null ? "" : intermediario.Conta;
//                        bank.digit = intermediario.ContaDv == null ? "" : intermediario.ContaDv;
//                        bank.customer_id = intermediario.pagarme_id;

//                        try
//                        {
//                            intermediario.BankToken = new client(methods.bank_accounts).set<entity.customer.bank_accounts>(bank).id;
//                        }
//                        catch (Exception ex)
//                        {
//                            int page = 1; 
//                            for (int i = 0; i < page; i++)
//                            {
//                                var bank_account = new client(methods.bank_accounts).get<entity.customer.bank_accounts>(null, "?page="+ page + "&page_size=30");
//                                foreach (var b in bank_account.result)
//                                {
//                                    if (b.customer_id == intermediario.pagarme_id)
//                                    {
//                                        intermediario.BankToken = b.id;
//                                        break;
//                                    }
//                                }
//                                bank.id = intermediario.BankToken;
                               
//                                page = bank_account.total / 30;
//                                if (page == 0)
//                                {
//                                    page = -1;
//                                }
//                                if (intermediario.BankToken != null)
//                                {
//                                    break;
//                                }
//                            }
//                        }

//                        if (intermediario.BankToken == null)
//                        {
//                            throw new Exception("Não foi possivel cadastrar o banco do usuário!");
//                        }
//                        var p = db.pessoa.Find(intermediario.id);
//                        p.BankToken = intermediario.BankToken;
//                        db.Entry(p).State = EntityState.Modified;
//                        db.SaveChanges();
//                    }

//                    entity.charges.intermediarie _intermediario = new entity.charges.intermediarie();

//                    _intermediario.flat = Convert.ToInt32((total * intermediario.comissao.Value / 100).ToString("f").Replace(",", ""));
//                    _intermediario.customer_id = intermediario.pagarme_id;
//                    _intermediario.description = "Pagamento Creapp";
//                    charges.intermediaries.Add(_intermediario);

//                }
//            }


//            var result = new client(methods.charges).set<entity.charges>(charges);

//            compra.pagarme_id = result.id;
//            compra.pagarme_status = result.status;

//        }

//        public void assinatura(api.Models.billing billing)
//        {
//            entity.customer customer = new entity.customer();
//            entity.charges charges = new entity.charges();
//            if (string.IsNullOrEmpty(billing.place.pagarme_id))
//            {
//                customer.name = billing.place.name;
//                customer.phone = billing.place.phone;
//                customer.email = billing.place.email.ToList()[0].nome;
//                if (customer.email == null)
//                {
//                    customer.email = Models.db.place.url + "@creapp.com.br";
//                }
//                customer.document = billing.place.card_document;

//                if (billing.place.location != null)
//                {
//                    customer.address.city = billing.place.location.city;
//                    customer.address.country = billing.place.location.country;
//                    customer.address.state = billing.place.location.state;
//                    customer.address.street = billing.place.location.street;
//                    customer.address.zip = billing.place.location.zip;
//                }

//                customer.card.name = billing.place.card_name;
//                customer.card.number = billing.place.card_number;
//                customer.card.month = Convert.ToInt32(billing.place.card_date.Substring(0, 2));
//                customer.card.year = Convert.ToInt32(billing.place.card_date.Substring(2));
//                customer.card.cvv = billing.place.card_cvv;

//                charges.customer_id = new client(methods.customers).set<entity.customer>(customer).id;
//                billing.place.pagarme_id = charges.customer_id;
//            }
//            else
//            {
//                charges.customer_id = billing.place.pagarme_id;
//            }

//            charges.amount = billing.amount.Value;
//            charges.statement_descriptor = Models.db.place.id.ToString();
//            charges.installments_number = 1;
//            charges.capture = true;
//            charges.force = true;

//            var result = new client(methods.charges).set<entity.charges>(charges);
//            billing.pagarme_id = result.id;
//            billing.pagarme_status = result.status;

//        }
//    }
//}
