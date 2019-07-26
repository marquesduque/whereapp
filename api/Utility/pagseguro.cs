using api.Models;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using Uol.PagSeguro.Constants;
using Uol.PagSeguro.Constants.PreApproval;
using Uol.PagSeguro.Domain;
using Uol.PagSeguro.Domain.Direct;
using Uol.PagSeguro.Exception;
using Uol.PagSeguro.Resources;
using Uol.PagSeguro.Service;

namespace Utility.Pagamento
{
    public class pagseguro
    {
        public static bool sandbox = true;
        public static string email = "diretoria@ifdcontroladoria.com.br";
        public static string token = "336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda";
        public static string token_sb = "5CDF0EAD4BCB4D35BCB76D7E44F21B5B";
        public string PostbackUrl = "https://whereapp.creait.com.br/api/notificacaopag";
        private db db = new db();

        public class compra
        {
            public compra()
            {
                produtos = new List<produto>();
            }
            public string nome { get; set; }
            public string email { get; set; }
            public int compra_id { get; set; }
            public string cpf { get; set; }
            public string data_nascimento { get; set; }
            public string telefone { get; set; }
            public string hash { get; set; }
            public string card_token { get; set; }
            public string nome_cartao { get; set; }
            public string expiracao { get; set; }
            public decimal valor_total { get; set; }
            public string estado { get; set; }
            public string cidade { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string estado_entrega { get; set; }
            public string cidade_entrega { get; set; }
            public string bairro_entrega { get; set; }
            public string cep_entrega { get; set; }
            public string rua_entrega { get; set; }
            public string numero_entrega { get; set; }
            public string complemento_entrega { get; set; }
            public List<produto> produtos { get; set; }
            public class produto
            {
                public int id { get; set; }
                public string nome { get; set; }
                public int quantidade { get; set; }
                public decimal valor { get; set; }
            }
        }

        public class assinatura
        {
            public int assinatura_id { get; set; }
            public string nome_assinatura { get; set; }
            public decimal valor_mensal { get; set; }
            public int dia_cobranca { get; set; }
            public string plano { get; set; }
            public string nome_usuario { get; set; }
            public string email_usuario { get; set; }
            public string hash { get; set; }
            public string telefone_usuario { get; set; }
            public string cpf_usuario { get; set; }
            public string estado { get; set; }
            public string cidade { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string rua { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string card_token { get; set; }
            public string nome_cartao { get; set; }
            public string data_nascimento { get; set; }
        }

        public class assinar
        {
            public assinar()
            {
                sender = new send();
                paymentMethod = new paymentM();
            }
            public string plan { get; set; }
            public string reference { get; set; }
            public send sender { get; set; }
            public paymentM paymentMethod { get; set; }
            public class send
            {
                public send()
                {
                    phone = new ph();
                    address = new add();
                    documents = new List<document>();
                }
                public string name { get; set; }
                public string email { get; set; }
                public string hash { get; set; }
                public ph phone { get; set; }
                public add address { get; set; }
                public List<document> documents { get; set; }
                public class ph
                {
                    public string areaCode { get; set; }
                    public string number { get; set; }
                }
                public class add
                {
                    public string street { get; set; }
                    public string number { get; set; }
                    public string complement { get; set; }
                    public string district { get; set; }
                    public string postalCode { get; set; }
                    public string city { get; set; }
                    public string state { get; set; }
                    public string country { get; set; }
                }
                public class document
                {
                    public string type { get; set; }
                    public string value { get; set; }
                }
            }
            public class paymentM
            {
                public paymentM()
                {
                    creditCard = new creditC();
                }
                public string type { get; set; }
                public creditC creditCard { get; set; }
                public class creditC
                {
                    public creditC()
                    {
                        holder = new hold();
                    }
                    public string token { get; set; }
                    public hold holder { get; set; }
                    public class hold
                    {
                        public hold()
                        {
                            documents = new List<document>();
                            phone = new ph();
                            billingAddress = new bA();
                        }
                        public string name { get; set; }
                        public string birthDate { get; set; }
                        public List<document> documents { get; set; }
                        public bA billingAddress { get; set; }
                        public ph phone { get; set; }
                        public class document
                        {
                            public string type { get; set; }
                            public string value { get; set; }
                        }
                        public class bA
                        {
                            public string street { get; set; }
                            public string number { get; set; }
                            public string complement { get; set; }
                            public string district { get; set; }
                            public string postalCode { get; set; }
                            public string city { get; set; }
                            public string state { get; set; }
                            public string country { get; set; }
                        }
                        public class ph
                        {
                            public string areaCode { get; set; }
                            public string number { get; set; }
                        }
                    }
                }
            }
        }

        public static string session
        {
            get
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                PagSeguroConfiguration.UrlXmlConfiguration = HttpContext.Current.Server.MapPath("~/PagSeguroConfig.xml");

                EnvironmentConfiguration.ChangeEnvironment(sandbox);

                AccountCredentials credentials = new AccountCredentials(Utility.Pagamento.pagseguro.email, Utility.Pagamento.pagseguro.token_sb);

                var result = SessionService.CreateSession(credentials);

                return result.id;
            }
        }

        public static string card(compra ent)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PagSeguroConfiguration.UrlXmlConfiguration = HttpContext.Current.Server.MapPath("~/PagSeguroConfig.xml");

            // Instantiate a new checkout
            CreditCardCheckout checkout = new CreditCardCheckout();

            // Sets the payment mode
            checkout.PaymentMode = PaymentMode.DEFAULT;

            // Sets the receiver e-mail should will get paid
            //checkout.ReceiverEmail = "pe.souza3@gmail.com";

            // Sets shipping information for this payment request
            checkout.Shipping = new Shipping();
            checkout.Shipping.ShippingType = ShippingType.NotSpecified;

            //Passando valor para ShippingCost
            checkout.Shipping.Cost = 0.00m;

            checkout.Shipping.Address = new Address(
                "BRA",
                ent.estado_entrega,
                ent.cidade_entrega,
                ent.bairro_entrega,
                ent.cep_entrega,
                ent.rua_entrega,
                ent.numero_entrega,
                string.IsNullOrEmpty(ent.complemento_entrega) ? "nt" : ent.complemento_entrega
            );

            // Sets the currency
            checkout.Currency = Currency.Brl;

            foreach (var p in ent.produtos)
            {
                checkout.Items.Add(new Item(p.id.ToString(), p.nome, p.quantidade, p.valor));
            }
            // Sets a reference code for this checkout, it is useful to identify this payment in future notifications.
            checkout.Reference = ent.compra_id.ToString();

            // Sets credit card holder information.
            checkout.Holder = new Holder(
                ent.nome_cartao,
                new Phone(ent.telefone.Split(' ')[0], ent.telefone.Split(' ')[1]),
                new HolderDocument("CPF", ent.cpf.Replace("-", "")),
                ent.data_nascimento
            );

            checkout.Billing = new Billing();
            checkout.Billing.Address = new Address(
                "BRA",
                ent.estado,
                ent.cidade,
                ent.bairro,
                ent.cep,
                ent.rua,
                ent.numero,
                string.IsNullOrEmpty(ent.complemento) ? "nt" : ent.complemento
            );
            // Sets your customer information.
            // If you using SANDBOX you must use an email @sandbox.pagseguro.com.br
            checkout.Sender = new Sender(
                ent.nome,
                ent.email,
                new Phone(ent.telefone.Split(' ')[0], ent.telefone.Split(' ')[1])
            );
            checkout.Sender.Hash = ent.hash;
            SenderDocument senderCPF = new SenderDocument(Documents.GetDocumentByType("CPF"), ent.cpf.Replace("-", ""));
            checkout.Sender.Documents.Add(senderCPF);

            // Sets a credit card token.
            checkout.Token = ent.card_token;

            //Sets the installments information
            checkout.Installment = new Installment(1, ent.valor_total, 2);

            // Sets the notification url
            checkout.NotificationURL = "https://whereapp.creait.com.br/api/notificacaopag";

            try
            {
                AccountCredentials credentials = new AccountCredentials(Utility.Pagamento.pagseguro.email, Utility.Pagamento.pagseguro.token);
                Transaction result = TransactionService.CreateCheckout(credentials, checkout);
                return result.Code;
            }
            catch (PagSeguroServiceException exception)
            {
                foreach (ServiceError element in exception.Errors)
                {
                    throw new Exception(element.Message);
                }
                return "Erro";
            }
        }

        public static string boleto(compra ent)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PagSeguroConfiguration.UrlXmlConfiguration = HttpContext.Current.Server.MapPath("~/PagSeguroConfig.xml");

            // Instantiate a new checkout
            BoletoCheckout checkout = new BoletoCheckout();

            // Sets the payment mode
            checkout.PaymentMode = PaymentMode.DEFAULT;

            // Sets the receiver e-mail should will get paid
            //checkout.ReceiverEmail = "pe.souza3@gmail.com";

            // Sets shipping information for this payment request
            checkout.Shipping = new Shipping();
            checkout.Shipping.ShippingType = ShippingType.NotSpecified;

            //Passando valor para ShippingCost
            checkout.Shipping.Cost = 0.00m;

            checkout.Shipping.Address = new Address(
                "BRA",
                ent.estado,
                ent.cidade,
                ent.bairro,
                ent.cep,
                ent.rua,
                ent.numero,
                string.IsNullOrEmpty(ent.complemento) ? "nt" : ent.complemento
            );

            // Sets the currency
            checkout.Currency = Currency.Brl;

            foreach (var p in ent.produtos)
            {
                checkout.Items.Add(new Item(p.id.ToString(), p.nome, p.quantidade, p.valor));
            }
            // Sets a reference code for this checkout, it is useful to identify this payment in future notifications.
            checkout.Reference = ent.compra_id.ToString();

            // Sets your customer information.
            // If you using SANDBOX you must use an email @sandbox.pagseguro.com.br
            checkout.Sender = new Sender(
                ent.nome,
                ent.email,
                new Phone(ent.telefone.Split(' ')[0], ent.telefone.Split(' ')[1])
            );
            checkout.Sender.Hash = ent.hash;
            SenderDocument senderCPF = new SenderDocument(Documents.GetDocumentByType("CPF"), ent.cpf);
            checkout.Sender.Documents.Add(senderCPF);

            // Sets the notification url
            checkout.NotificationURL = "https://whereapp.creait.com.br/api/notificacaopag";

            try
            {
                AccountCredentials credentials = new AccountCredentials(Utility.Pagamento.pagseguro.email, Utility.Pagamento.pagseguro.token);
                Transaction result = TransactionService.CreateCheckout(credentials, checkout);
                pagseguro pag = new pagseguro();

                var compra = pag.db.compra.Find(ent.compra_id);
                compra.boleto_url = result.PaymentLink;
                pag.db.SaveChanges();

                return result.Code;
            }
            catch (PagSeguroServiceException exception)
            {
                foreach (ServiceError element in exception.Errors)
                {
                    throw new Exception(element.Message);
                }
                Console.Read();
                return "Error";
            }
        }

        public void notification(string data)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PagSeguroConfiguration.UrlXmlConfiguration = HttpContext.Current.Server.MapPath("~/PagSeguroConfig.xml");
            pagseguro pag = new pagseguro();

            EnvironmentConfiguration.ChangeEnvironment(sandbox);

            try
            {

                AccountCredentials credentials = new AccountCredentials(Utility.Pagamento.pagseguro.email, Utility.Pagamento.pagseguro.token);

                // TODO: Substitute the code below with a notification code for your transaction. 
                // You receive this notification code through a post on the URL that you specify in 
                // this page: https://pagseguro.uol.com.br/integracao/notificacao-de-transacoes.jhtml

                // Use notificationType to check if is PreApproval (preApproval or transaction)
                Transaction transaction = NotificationService.CheckTransaction(credentials, data);

                if (transaction.TransactionStatus.ToString() == "Initiated" || transaction.TransactionStatus.ToString() == "WaitingPayment")
                {
                    var compra = pag.db.compra.Find(transaction.Reference);
                    compra.pagarme_status = 0;
                    pag.db.Entry(compra).State = System.Data.Entity.EntityState.Modified;
                    pag.db.SaveChanges();
                }
                else if (transaction.TransactionStatus.ToString() == "InAnalysis")
                {
                    var compra = pag.db.compra.Find(transaction.Reference);
                    compra.pagarme_status = 1;
                    pag.db.Entry(compra).State = System.Data.Entity.EntityState.Modified;
                    pag.db.SaveChanges();
                }
                else if (transaction.TransactionStatus.ToString() == "Paid")
                {
                    var compra = pag.db.compra.Find(transaction.Reference);
                    compra.pagarme_status = 2;
                    pag.db.Entry(compra).State = System.Data.Entity.EntityState.Modified;
                    pag.db.SaveChanges();
                }
                else if (transaction.TransactionStatus.ToString() == "Cancelled")
                {
                    var compra = pag.db.compra.Find(Convert.ToInt32(transaction.Reference));
                    compra.pagarme_status = 3;
                    pag.db.Entry(compra).State = System.Data.Entity.EntityState.Modified;
                    pag.db.SaveChanges();

                    foreach (var i in pag.db.compra_item.Where(c => c.compra_id == compra.id).ToList())
                    {
                        var alterar_estoque = db.item.Find(i.item_id);
                        alterar_estoque.estoque = alterar_estoque.estoque + i.quantidade;
                        db.Entry(alterar_estoque).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();

                        //db.compra_item.Remove(i);
                        //db.SaveChanges();
                    }
                }
            }
            catch (PagSeguroServiceException exception)
            {

                foreach (ServiceError element in exception.Errors)
                {
                    throw new Exception(element.Message);
                }
                Console.Read();
            }
        }

        public static string criar_plano(assinatura ent)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PagSeguroConfiguration.UrlXmlConfiguration = HttpContext.Current.Server.MapPath("~/PagSeguroConfig.xml");

            EnvironmentConfiguration.ChangeEnvironment(sandbox);

            // Instantiate a new preApproval request
            PreApprovalRequest preApproval = new PreApprovalRequest();

            // Sets the currency
            preApproval.Currency = Currency.Brl;

            // Sets a reference code for this preApproval request, it is useful to identify this payment in future notifications.
            preApproval.Reference = ent.assinatura_id.ToString();

            // Sets your customer information.
            preApproval.Sender = new Sender(
                ent.nome_usuario,
                ent.email_usuario,
                new Phone(ent.telefone_usuario.Split(' ')[0], ent.telefone_usuario.Split(' ')[1])
            );

            // Sets the preApproval informations
            var now = DateTime.Now;
            preApproval.PreApproval = new PreApproval();
            preApproval.PreApproval.Charge = Charge.Auto;
            preApproval.PreApproval.Name = ent.nome_assinatura;
            preApproval.PreApproval.AmountPerPayment = ent.valor_mensal;
            preApproval.PreApproval.MaxAmountPerPeriod = ent.valor_mensal;
            preApproval.PreApproval.MaxPaymentsPerPeriod = 5;
            preApproval.PreApproval.Details = string.Format("Todo dia {0} será cobrado o valor de {1} referente ao seguro contra roubo do Notebook.", now.Day, preApproval.PreApproval.AmountPerPayment.ToString("C2"));
            preApproval.PreApproval.Period = Period.Monthly;
            preApproval.PreApproval.DayOfMonth = ent.dia_cobranca;
            preApproval.PreApproval.InitialDate = now;
            preApproval.PreApproval.FinalDate = now.AddYears(5);
            preApproval.PreApproval.MaxTotalAmount = Convert.ToDecimal(ent.valor_mensal * (5 * 12));

            // Sets the url used by PagSeguro for redirect user after ends checkout process
            //preApproval.RedirectUri = new Uri("http://www.lojamodelo.com.br/retorno");

            // Sets the url used for user review the signature or read the rules
            //preApproval.ReviewUri = new Uri("http://www.lojamodelo.com.br/revisao");

            SenderDocument senderCPF = new SenderDocument(Documents.GetDocumentByType("CPF"), ent.cpf_usuario);
            preApproval.Sender.Documents.Add(senderCPF);

            try
            {
                AccountCredentials credentials = new AccountCredentials(Utility.Pagamento.pagseguro.email, Utility.Pagamento.pagseguro.token_sb);

                Uri preApprovalRedirectUri = preApproval.Register(credentials);

                return preApprovalRedirectUri.Query.Split('=')[1];
            }
            catch (PagSeguroServiceException exception)
            {
                Console.WriteLine(exception.Message + "\n");

                foreach (ServiceError element in exception.Errors)
                {
                    Console.WriteLine(element + "\n");
                }
                return "";
            }
        }

        public void assinar_plano(assinatura ent)
        {
            var client = new RestClient("https://ws.sandbox.pagseguro.uol.com.br/pre-approvals");
            var request = new RestRequest(Method.POST);
            
            client.AddDefaultHeader("Content-Type", "application/json;charset=ISO-8859-1");
            client.AddDefaultHeader("Accept", "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1");

            assinar assinar = new assinar();

            request.AddParameter("email", email);
            request.AddParameter("token", token_sb);
            request.AddParameter("plan", ent.plano);
            request.AddParameter("reference", ent.assinatura_id);
            request.AddParameter("sender.hash", ent.hash);
            request.AddParameter("sender.name", ent.nome_usuario);
            request.AddParameter("sender.documents[0]", "{ 'type': 'CPF', 'value':'40168564858' }");
            //request.AddParameter("sender.documents[0].type", "CPF");
            //request.AddParameter("sender.documents[0].value", ent.cpf_usuario);
            request.AddParameter("sender.phone.areaCode", ent.telefone_usuario.Split(' ')[0]);
            request.AddParameter("sender.phone.number", ent.telefone_usuario.Split(' ')[1]);
            request.AddParameter("sender.email", "teste@sandbox.pagseguro.com.br");

            request.AddParameter("sender.address.street", ent.rua);
            request.AddParameter("sender.address.number", ent.numero);
            request.AddParameter("sender.address.complement", ent.complemento);
            request.AddParameter("sender.address.district", ent.bairro);
            request.AddParameter("sender.address.postalCode", ent.cep);
            request.AddParameter("sender.address.city", ent.cidade);
            request.AddParameter("sender.address.state", ent.estado);
            request.AddParameter("sender.address.country", "BRA");

            request.AddParameter("paymentMethod.type", "creditCard");
            request.AddParameter("paymentMethod.creditCard.token", ent.card_token);
            request.AddParameter("paymentMethod.creditCard.holder.name", ent.nome_cartao);
            request.AddParameter("paymentMethod.creditCard.holder.documents[0]", "{ 'type': 'CPF', 'value':'40168564858'}");
            //request.AddParameter("paymentMethod.creditCard.holder.documents[0].type", "CPF");
            //request.AddParameter("paymentMethod.creditCard.holder.documents[0].value", ent.cpf_usuario);
            request.AddParameter("paymentMethod.creditCard.holder.birthDate", ent.data_nascimento);
            request.AddParameter("paymentMethod.creditCard.holder.phone.areaCode", ent.telefone_usuario.Split(' ')[0]);
            request.AddParameter("paymentMethod.creditCard.holder.phone.number", ent.telefone_usuario.Split(' ')[1]);

            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.street", ent.rua);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.number", ent.numero);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.complement", ent.complemento);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.district", ent.bairro);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.postalCode", ent.cep);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.city", ent.cidade);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.state", ent.estado);
            request.AddParameter("paymentMethod.creditCard.holder.billingAddress.country", "BRA");

            assinar.plan = ent.plano;
            assinar.reference = ent.assinatura_id.ToString();

            assinar.sender.name = ent.nome_usuario;
            assinar.sender.email = "teste@sandbox.pagseguro.com.br";
            assinar.sender.hash = ent.hash;

            assinar.sender.phone.areaCode = ent.telefone_usuario.Split(' ')[0];
            assinar.sender.phone.number = ent.telefone_usuario.Split(' ')[1];

            assinar.sender.address.street = ent.rua;
            assinar.sender.address.number = ent.numero;
            assinar.sender.address.complement = ent.complemento;
            assinar.sender.address.district = ent.bairro;
            assinar.sender.address.postalCode = ent.cep;
            assinar.sender.address.city = ent.cidade;
            assinar.sender.address.state = ent.estado;
            assinar.sender.address.country = "BRA";

            assinar.sender.documents.Add(new assinar.send.document()
            {
                type = "CPF",
                value = ent.cpf_usuario
            });

            assinar.paymentMethod.type = "creditCard";
            assinar.paymentMethod.creditCard.token = ent.card_token;
            assinar.paymentMethod.creditCard.holder.name = ent.nome_cartao;
            assinar.paymentMethod.creditCard.holder.birthDate = ent.data_nascimento;

            assinar.paymentMethod.creditCard.holder.documents.Add(new assinar.paymentM.creditC.hold.document()
            {
                type = "CPF",
                value = ent.cpf_usuario
            });

            assinar.paymentMethod.creditCard.holder.phone.areaCode = ent.telefone_usuario.Split(' ')[0];
            assinar.paymentMethod.creditCard.holder.phone.number = ent.telefone_usuario.Split(' ')[1];

            assinar.paymentMethod.creditCard.holder.billingAddress.street = ent.rua;
            assinar.paymentMethod.creditCard.holder.billingAddress.number = ent.numero;
            assinar.paymentMethod.creditCard.holder.billingAddress.complement = ent.complemento;
            assinar.paymentMethod.creditCard.holder.billingAddress.district = ent.bairro;
            assinar.paymentMethod.creditCard.holder.billingAddress.postalCode = ent.cep;
            assinar.paymentMethod.creditCard.holder.billingAddress.city = ent.cidade;
            assinar.paymentMethod.creditCard.holder.billingAddress.state = ent.estado;
            assinar.paymentMethod.creditCard.holder.billingAddress.country = "BRA";

            request.AddObject(assinar);

            request.RequestFormat = DataFormat.Json;

            IRestResponse response = client.Execute(request);
            string result = response.Content;

            Console.Write(response);
            Console.Read();
        }
    }

}
