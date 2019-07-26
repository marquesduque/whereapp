using api.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System;



using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace api.Pagamento
{
    public class paggi_novo
    {
        public string ErrorMessage { get; set; }
        private static string address = "https://api.stg.paggi.com/v1/partners/1625cfb4-3113-4890-82b8-2eb32d7f3c28";
        private static string token = "#1625cfb4-3113-4890-82b8-2eb32d7f3c28|eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJQQUdHSSIsImV4cCI6NjIwMzAyNDczMTAsImlhdCI6MTU1MDI0NzMxMCwiaXNzIjoiUEFHR0kiLCJqdGkiOiI2ZDg1MmE0NC1hYzVhLTRkZGYtODJiZC03NzdiYmIxZjAzZTUiLCJuYmYiOjE1NTAyNDczMDksInBlcm1pc3Npb25zIjpbeyJwYXJ0bmVyX2lkIjoiMTYyNWNmYjQtMzExMy00ODkwLTgyYjgtMmViMzJkN2YzYzI4IiwicGVybWlzc2lvbnMiOlsic3lzdGVtX3VzZXIiXX1dLCJzdWIiOiJiYjhiYzZjZS1iNmFmLTQwODEtYWExYS0yNTU4MmUyNTVlMmQiLCJ0eXAiOiJhY2Nlc3MifQ._PiGZN0UYdSWFPZ2InYV_P0GlfreOxvTlHDj2XIAS8-HVpVDfA-MbU761slXAFnDQK22LoYbuUh662_wsAPeAA";

        
        public paggi_novo(string Token)
        {
            if (Token != null)
            {
                token = Token.Split('|')[1];
            }

            if (Token.Contains("#"))
            {
                address = "https://api.stg.paggi.com/v1/partners/" + Token.Split('|')[0].Replace("#", "");
            }
            else
            {
                address = "https://api.paggi.com/v1/partners/" + Token.Split('|')[0].Replace("#", "");
            }
        }

        public class entity
        {
            public partial class Order
            {
                [JsonProperty("capture")]
                public bool Capture { get; set; }

                [JsonProperty("ip")]
                public string ip { get; set; }

                [JsonProperty("status")]
                public string status { get; set; }

                [JsonProperty("recipients")]
                public List<Recipient> Recipients { get; set; }

                [JsonProperty("id")]
                public Guid? id { get; set; }

                [JsonProperty("external_identifier")]
                public string ExternalIdentifier { get; set; }

                [JsonProperty("customer")]
                public Customer Customer { get; set; }

                [JsonProperty("charges")]
                public List<Charge> Charges { get; set; }



            }
            public partial class Recipient
            {
                [JsonProperty("name")]
                public string Name { get; set; }

                [JsonProperty("id")]
                public Guid? Id { get; set; }

                [JsonProperty("document")]
                public string Document { get; set; }

                [JsonProperty("amount")]
                public long? Amount { get; set; }

                [JsonProperty("percentage")]
                public long Percentage { get; set; }

                [JsonProperty("bank_account")]
                public BankAccount BankAccount { get; set; }
            }
            public partial class Card
            {
                [JsonProperty("id")]
                public string id { get; set; }

                [JsonProperty("cvc")]
                public string Cvc { get; set; }

                [JsonProperty("year")]
                public string Year { get; set; }

                [JsonProperty("month")]
                public string Month { get; set; }

                [JsonProperty("number")]
                public string Number { get; set; }

                [JsonProperty("holder")]
                public string Holder { get; set; }

                [JsonProperty("document")]
                public string Document { get; set; }
            }

            public partial class BankAccount
            {
                [JsonProperty("branch_number")]
                public string BranchNumber { get; set; }

                [JsonProperty("branch_digit")]
                public string BranchDigit { get; set; }

                [JsonProperty("bank_code")]
                public string BankCode { get; set; }

                [JsonProperty("bank")]
                public Bank Bank { get; set; }

                [JsonProperty("account_number")]
                public string AccountNumber { get; set; }

                [JsonProperty("account_digit")]
                public string AccountDigit { get; set; }

                [JsonProperty("document")]
                public string Document { get; set; }
            }

            public partial class Bank
            {
                [JsonProperty("id")]
                public Guid Id { get; set; }

                [JsonProperty("bank_name")]
                public string BankName { get; set; }

                [JsonProperty("bank_ispb")]
                public string BankIspb { get; set; }

                [JsonProperty("bank_code")]
                public string BankCode { get; set; }
            }

            public partial class Charge
            {
                [JsonProperty("statuses")]
                public Status[] Statuses { get; set; }

                [JsonProperty("installments")]
                public long Installments { get; set; }


                [JsonProperty("id")]
                public string Id { get; set; }

                [JsonProperty("card_id")]
                public string CardId { get; set; }


                [JsonProperty("card")]
                public Card Card { get; set; }

                [JsonProperty("bankslip")]
                public Bankslip Bankslip { get; set; }

                [JsonProperty("amount")]
                public long Amount { get; set; }
            }

            public partial class Bankslip
            {
                [JsonProperty("url")]
                public string Url { get; set; }

                [JsonProperty("expires_at")]
                public DateTimeOffset ExpiresAt { get; set; }

                [JsonProperty("barcode")]
                public string Barcode { get; set; }
            }
            public partial class Status
            {
                [JsonProperty("type")]
                public string Type { get; set; }

                [JsonProperty("reason")]
                public string Reason { get; set; }


                [JsonProperty("amount")]
                public long Amount { get; set; }
            }

            public partial class Customer
            {
                [JsonProperty("name")]
                public string Name { get; set; }

                [JsonProperty("email")]
                public string Email { get; set; }

                [JsonProperty("document")]
                public string Document { get; set; }

                [JsonProperty("address")]
                public Address Address { get; set; }

            }
            public partial class Address
            {
                [JsonProperty("zipcode")]
                public string Zipcode { get; set; }

                [JsonProperty("street")]
                public string Street { get; set; }

                [JsonProperty("number")]
                public string Number { get; set; }

                [JsonProperty("neighborhood")]
                public string Neighborhood { get; set; }

                [JsonProperty("city")]
                public string City { get; set; }

                [JsonProperty("state")]
                public string State { get; set; }
            }


            public partial class Result
            {
                [JsonProperty("id")]
                public Guid Id { get; set; }

                [JsonProperty("external_identifier")]
                public string ExternalIdentifier { get; set; }

                [JsonProperty("status")]
                public string Status { get; set; }

                [JsonProperty("charges")]
                public Charge[] Charges { get; set; }
            }
            public partial class Plan
            {
                [JsonProperty("trial_period")]
                public string TrialPeriod { get; set; }

                [JsonProperty("price")]
                public long Price { get; set; }

                [JsonProperty("name")]
                public string Name { get; set; }

                [JsonProperty("interval")]
                public string Interval { get; set; }


                [JsonProperty("id")]
                public string Id { get; set; }

                [JsonProperty("external_identifier")]
                public string ExternalIdentifier { get; set; }

                [JsonProperty("description")]
                public string Description { get; set; }
            }
            public partial class Subscription
            {
                [JsonProperty("external_identifier")]
                public string ExternalIdentifier { get; set; }

                [JsonProperty("plan_id")]
                public string PlanId { get; set; }

                [JsonProperty("ip")]
                public string Ip { get; set; }

                [JsonProperty("customer")]
                public Customer Customer { get; set; }

                [JsonProperty("card")]
                public Card Card { get; set; }

                [JsonProperty("discount")]
                public Additional[] Discount { get; set; }

                [JsonProperty("additional")]
                public Additional[] Additional { get; set; }
            }

            public partial class Additional
            {
                [JsonProperty("period")]
                public long Period { get; set; }

                [JsonProperty("description")]
                public string Description { get; set; }

                [JsonProperty("amount")]
                public long Amount { get; set; }
            }
        }

        public class client
        {
            private string Method { get; set; }
            private HttpClient Client { get; set; }

            public string log
            {
                get
                {
                    if (System.IO.File.Exists(HttpContext.Current.Server.MapPath("~/paggi.log")))
                    {
                        return System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/paggi.log"));
                    }
                    return "";
                }
                set
                {
                    try
                    {
                        System.IO.File.WriteAllText(HttpContext.Current.Server.MapPath("~/paggi.log"), log + value);
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }

            public client(string method)
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                HttpClient httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                if (!string.IsNullOrEmpty(System.Web.HttpContext.Current.Request.Headers["x-forwarded-for"]))
                    httpClient.DefaultRequestHeaders.Add("x-forwarded-for", System.Web.HttpContext.Current.Request.Headers["x-forwarded-for"]);
                else
                    httpClient.DefaultRequestHeaders.Add("x-forwarded-for", System.Web.HttpContext.Current.Request.UserHostAddress);

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                Client = httpClient;
                Method = method.ToString();
            }

            public T get<T>(int? id = null)
            {
                var content = new StringContent(JsonConvert.SerializeObject(null).ToString(), Encoding.UTF8, "application/json");
                var result = Client.GetAsync(address + "/" + Method + (id == null ? "" : "/" + id)).Result;

                if (result.StatusCode == HttpStatusCode.OK)
                {
                    var contents = result.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<T>(contents);
                }
                else
                {
                    throw new ApplicationException(string.Concat((int)result.StatusCode, " - ", result.ReasonPhrase));
                }
            }
            public T set<T>(object value)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("::CHAMADA POST::" + DateTime.Now.ToString() + "::" + address + "/" + Method + Environment.NewLine);
                sb.Append("::ENVIO::" + JsonConvert.SerializeObject(value, Newtonsoft.Json.Formatting.None, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }) + Environment.NewLine);

                var content = new StringContent(JsonConvert.SerializeObject(value,
                            Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Ignore
                            }), Encoding.UTF8, "application/json");
                var result = Client.PostAsync(address + "/" + Method, content).Result;

                if (result.StatusCode == HttpStatusCode.Created)
                {
                    var contents = result.Content.ReadAsStringAsync().Result;
                    sb.Append("::RESPOSTA::" + contents);
                    sb.Append(Environment.NewLine);
                    sb.Append(Environment.NewLine);
                    log = sb.ToString();

                    return JsonConvert.DeserializeObject<T>(contents);
                }
                else
                {
                    var contents = result.Content.ReadAsStringAsync().Result;

                    string ContentToString = result.Content.ReadAsStringAsync().Result;


                    sb.Append("::RESPOSTA::" + ContentToString);
                    sb.Append(Environment.NewLine);
                    sb.Append(Environment.NewLine);
                    log = sb.ToString();

                    throw new Exception(ContentToString);

                    return JsonConvert.DeserializeObject<T>(ContentToString);
                }
            }
            public T put<T>(string id, object value)
            {

                var content = new StringContent(JsonConvert.SerializeObject(value).ToString(), Encoding.UTF8, "application/json");
                var result = Client.PutAsync(address + "/" + Method + "/" + id, content).Result;

                if (result.StatusCode == HttpStatusCode.OK)
                {
                    var contents = result.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<T>(contents);
                }
                else
                {
                    var contents = result.Content.ReadAsStringAsync().Result;

                    string ContentToString = result.Content.ReadAsStringAsync().Result;

                    throw new Exception(ContentToString);

                    return JsonConvert.DeserializeObject<T>(ContentToString);
                }
            }
        }


        public string cartao(cartao cartao, db db)
        {
            entity.Card card = new entity.Card();

            card.Holder = cartao.nome;
            card.Document = cartao.documento;

            card.Number = cartao.numero.Replace(" ", "");
            card.Month = cartao.expiracao.Split('/')[0];
            card.Year = cartao.expiracao.Split('/')[1];
            card.Cvc = cartao.cvv;

            if (string.IsNullOrEmpty(cartao.pagarme_id))
            {
                var paggi_result = new client("cards").set<entity.Card>(card);

                var cartao_find = db.cartao.FirstOrDefault(c => c.pessoa_id == cartao.pessoa_id && c.numero == card.Number);

                if (cartao_find != null)
                {
                    cartao_find.nome = cartao.nome;
                    cartao_find.documento = cartao.documento;
                    cartao_find.pagarme_id = paggi_result.id;

                    cartao_find.numero = cartao.numero.Replace(" ", "");
                    cartao_find.expiracao = cartao.expiracao;
                    cartao_find.cvv = cartao.cvv;
                    db.Entry(cartao_find).State = EntityState.Modified;
                    db.SaveChanges();
                    cartao = cartao_find;
                }
                else
                {
                    cartao.pagarme_id = paggi_result.id;
                    db.cartao.Add(cartao);
                    db.SaveChanges();
                }
            }

            return cartao.pagarme_id;

        }
        protected string GetIPAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }
        public void compra(compra compra, List<pessoa> intermediarios)
        {
            db db = new db();


 
            if (compra.valor_frete == null)
            {
                compra.valor_frete = 0;
            }
            if (compra.desconto == null)
            {
                compra.desconto = 0;
            }
            if (compra.total == null)
            {
                compra.total = 0;
            }


            var cartao = db.cartao.Include("pessoa").OrderByDescending(c => c.id).FirstOrDefault(c => c.pessoa_id == compra.comprador_id);



            entity.Order order = new entity.Order();
            order.Capture = false;
            order.ip = HttpContext.Current.Request.UserHostAddress.Length == 3 ? "127.0.0.1" : HttpContext.Current.Request.UserHostAddress;

            entity.Customer customer = new entity.Customer();
            customer.Name = cartao.pessoa.nome;
            customer.Email = cartao.pessoa.email;
            customer.Document = cartao.documento;
            order.Customer = customer;


            entity.Charge charge = new entity.Charge();
            decimal total = (compra.total.Value + compra.valor_frete.Value - compra.desconto.Value);
            charge.Amount = Convert.ToInt32(total.ToString("f").Replace(",", ""));
            charge.Installments = 1;

            charge.Card = new entity.Card();
            if (cartao.pagarme_id != null)
            {
                charge.Card.id = cartao.pagarme_id;
            }
            else
            {
                charge.Card.Holder = cartao.nome;
                charge.Card.Number = cartao.numero.Replace(" ", "");
                charge.Card.Month = cartao.expiracao.Split('/')[0];
                charge.Card.Year = cartao.expiracao.Split('/')[1];
                charge.Card.Document = cartao.documento;
                charge.Card.Cvc = cartao.cvv;
            }

            order.Charges = new List<entity.Charge>();
            order.Charges.Add(charge);

            if (intermediarios != null && intermediarios.Count(c => c.comissao != null && c.BankCode != null && c.Agencia != null && c.Conta != null) > 0)
            {
                order.Recipients = new List<entity.Recipient>();
                foreach (var intermediario in intermediarios.Where(c => c.comissao != null && c.BankCode != null && c.Agencia != null && c.Conta != null))
                {
                    entity.Recipient customer_intermediario = new entity.Recipient();


                    customer_intermediario.Name = intermediario.LegalName;
                    customer_intermediario.Document = intermediario.DocumentNumber.Replace(" ", "");
                    customer_intermediario.Percentage = Convert.ToInt32((total * intermediario.comissao.Value / 100).ToString("f").Replace(",", ""));
                    customer_intermediario.BankAccount = new entity.BankAccount()
                    {
                        BranchNumber = intermediario.Agencia.PadLeft(5, '0'),
                        BranchDigit = intermediario.AgenciaDv,
                        AccountNumber = intermediario.Conta,
                        AccountDigit = intermediario.ContaDv,
                        BankCode = intermediario.BankCode,
                        Document = intermediario.DocumentNumber
                    };
                    order.Recipients.Add(customer_intermediario);
                }
            }
            var result = new client("orders").set<entity.Order>(order);

            compra.pagarme_id = result.id.ToString();
            compra.pagarme_status = Convert.ToInt32(result.status);
        }
        
    }
}
