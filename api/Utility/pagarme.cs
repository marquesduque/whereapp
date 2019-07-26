//using api.Models;
//using PagarMe;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace api.Pagamento
//{
//    public class pagarme
//    {
//        public string PostbackUrl = "http://creapp.com.br";//"http://c750ed00.ngrok.io";
//        private db db = new db();
//        public Transaction boleto(Models.compra compra)
//        {
//            var creait = new Models.delivery_prospectEntities().creait.LastOrDefault();
//            PagarMeService.DefaultApiKey = creait.pagarme_DefaultApiKey;
//            PagarMeService.DefaultEncryptionKey = creait.pagarme_DefaultEncryptionKey;

//            Transaction transaction = new PagarMe.Transaction();

//            transaction.Amount = Convert.ToInt32(compra.total.Value.ToString("f").Replace(",", ""));
//            transaction.PaymentMethod = PaymentMethod.Boleto;
//            transaction.PostbackUrl = PostbackUrl + "/api/pagamento";


//            List<Documents> doc = new List<Documents>();
//            doc.Add(new Documents()
//            {
//                Type = "cpf",
//                Number = compra.horario.FirstOrDefault().pessoa.cpf.Replace(".", "").Replace("-", "")
//            });

//            transaction.Customer = new Customer()
//            {
//                Name = compra.horario.FirstOrDefault().pessoa.nome,
//                Email = compra.horario.FirstOrDefault().pessoa.email,
//                Type = "individual",
//                Documents = doc.ToArray()
//            };

//            BankAccount bank1 = new BankAccount()
//            {
//                Agencia = "00000",
//                AgenciaDv = "0",
//                Conta = "00000",
//                ContaDv = "0",
//                BankCode = "000",
//                DocumentNumber = "18152564000105",
//                LegalName = "Aardvark da Silva"
//            };
//            bank1.Save();

//            BankAccount bank2 = new BankAccount()
//            {
//                Agencia = "0196",
//                AgenciaDv = "0",
//                Conta = "05392",
//                ContaDv = "0",
//                BankCode = "001",
//                DocumentNumber = "05737104141",
//                LegalName = "JONATHAN LIMA"
//            };
//            bank2.Save();


//            Recipient r2 = new Recipient();
//            r2.BankAccount = bank2;
//            r2.TransferEnabled = true;
//            r2.TransferInterval = TransferInterval.Weekly;
//            r2.TransferDay = 1;
//            r2.AnticipatableVolumePercentage = 80;
//            r2.AutomaticAnticipationEnabled = true;
//            r2.Save();

//            Recipient r1 = new Recipient();
//            r1.BankAccount = bank1;
//            r1.TransferEnabled = true;
//            r1.TransferInterval = TransferInterval.Weekly;
//            r1.TransferDay = 1;
//            r1.AnticipatableVolumePercentage = 80;
//            r1.AutomaticAnticipationEnabled = true;
//            r1.Save();

//            transaction.SplitRules = new[]
//            {
//                    new SplitRule {
//                        Recipient = r1,
//                        Percentage = 10,
//                        ChargeProcessingFee = true,
//                        Liable = true
//                    },
//                    new SplitRule {
//                        Recipient = r2,
//                        Percentage = 90,
//                        ChargeProcessingFee = true,
//                        Liable = true
//                    }
//                };

//            transaction.Save();

//            string boletoUrl = transaction.BoletoUrl;
//            string boletoBarcode = transaction.BoletoBarcode;

//            return transaction;
//        }

//        public Transaction cartao(pedidoController.Pedido pedido)
//        {
//            if (pedido.compra.filial == null)
//            {
//                pedido.compra.filial = db.filial.Find(pedido.compra.filial_id);
//            }
//            var creait = new Models.delivery_prospectEntities().creait.FirstOrDefault();

//            PagarMeService pagarMeService = new PagarMeService(creait.pagarme_DefaultApiKey, creait.pagarme_DefaultEncryptionKey);

//            var cards = pagarMeService.Cards.FindAll(new Card(pagarMeService) { Number = pedido.compra.cartao.numero }).ToList();

//            Transaction transaction = new PagarMe.Transaction(pagarMeService);
//            Card card = new Card(pagarMeService);
//            if (cards.Count() > 0)
//            {
//                transaction.Card = cards[cards.Count()-1];
//            }
//            else
//            {
//                card = new Card(pagarMeService)
//                {
//                    Number = pedido.compra.cartao.numero,
//                    HolderName = pedido.compra.cartao.nome,
//                    ExpirationDate = pedido.compra.cartao.expiracao.Replace(" / ", ""),
//                    Cvv = pedido.compra.cartao.cvv
//                };
//                card.Save();
//                transaction.Card = card;
//            }


//            if (pedido.compra.valor_frete == null)
//            {
//                pedido.compra.valor_frete = 0;
//            }
//            if (pedido.compra.desconto == null)
//            {
//                pedido.compra.desconto = 0;
//            }
//            if (pedido.compra.total == null)
//            {
//                pedido.compra.total = 0;
//            }

//            transaction.Amount = Convert.ToInt32((pedido.compra.total.Value + pedido.compra.valor_frete.Value - pedido.compra.desconto.Value).ToString("f").Replace(",", ""));
//            transaction.PaymentMethod = PaymentMethod.CreditCard;



//            transaction.PostbackUrl = PostbackUrl + "/api/pagamento_cartao";


//            List<Documents> doc = new List<Documents>();
//            doc.Add(new Documents(pagarMeService)
//            {
//                Type = pedido.compra.cpf.Length <= 12 ? "cpf" : "cnpj",
//                Number = pedido.compra.cpf
//            });

//            var comprador = db.pessoa.Find(pedido.compra.comprador_id).email;


//            var telefones = new List<string>();
//            telefones.Add("+5511941699879");

//            var customer = new Customer(pagarMeService)
//            {
//                Name = pedido.compra.cartao.nome,
//                Email = comprador,
//                Type = "individual",
//                Documents = doc.ToArray(),
//                Country = "br",
//                PhoneNumbers = telefones.ToArray(),
//                External_Id = pedido.compra.comprador_id.ToString()
//            };

//            transaction.Customer = customer;

//            Models.delivery_prospectEntities db_prospect = new Models.delivery_prospectEntities();

//            List<PagarMe.SplitRule> arr = new List<SplitRule>();

//            int taxa = 100;
//            if (pedido.compra.filial.taxa_cartao != null)
//            {
//                taxa = taxa - pedido.compra.filial.taxa_cartao.Value;

//                BankAccount bank1 = new BankAccount(pagarMeService)
//                {
//                    Agencia = creait.Agencia,
//                    AgenciaDv = creait.AgenciaDv,
//                    Conta = creait.Conta,
//                    ContaDv = creait.AgenciaDv,
//                    BankCode = creait.BankCode,
//                    DocumentNumber = creait.DocumentNumber,
//                    LegalName = creait.LegalName
//                };
//                bank1.Save();

//                Recipient r1 = new Recipient(pagarMeService);
//                r1.BankAccount = bank1;
//                r1.TransferEnabled = true;
//                r1.TransferInterval = TransferInterval.Weekly;
//                r1.TransferDay = 1;
//                r1.Save();

//                arr.Add(new SplitRule
//                {
//                    Recipient = r1,
//                    Percentage = pedido.compra.filial.taxa_cartao.Value,
//                    ChargeProcessingFee = true,
//                    Liable = true
//                });
//            }

//            BankAccount bank2 = new BankAccount(pagarMeService)
//            {
//                Agencia = pedido.compra.filial.Agencia,
//                AgenciaDv = pedido.compra.filial.AgenciaDv,
//                Conta = pedido.compra.filial.Conta,
//                ContaDv = pedido.compra.filial.ContaDv,
//                BankCode = pedido.compra.filial.BankCode,
//                DocumentNumber = pedido.compra.filial.DocumentNumber,
//                LegalName = pedido.compra.filial.LegalName
//            };
//            bank2.Save();


//            Recipient r2 = new Recipient(pagarMeService);
//            r2.BankAccount = bank2;
//            r2.TransferEnabled = true;
//            r2.TransferInterval = TransferInterval.Weekly;
//            r2.TransferDay = 1;
//            r2.Save();

//            arr.Add(new SplitRule
//            {
//                Recipient = r2,
//                Percentage = taxa,
//                //indica se o recebedor vinculado à regra será cobrado pelas taxas da transação
//                ChargeProcessingFee = (pedido.compra.filial.taxa_cartao == null || pedido.compra.filial.taxa_cartao == 0),
//                Liable = true
//            });

//            transaction.SplitRules = arr.ToArray();
//            transaction.Save();


//            return transaction;
//        }
        
//        public Subscription assinatura(api.Models.billing Billing)
//        {
//            var creait = new Models.delivery_prospectEntities().creait.FirstOrDefault();

//            PagarMeService pagarMeService = new PagarMeService(creait.pagarme_DefaultApiKey, creait.pagarme_DefaultEncryptionKey);

//            var plans = pagarMeService.Plans.FindAll(new Plan(pagarMeService));

//            Plan plan = new Plan(pagarMeService);
//            if (plans.Count(c => c.Name == Billing.plan.name) > 0)
//            {
//                plan = plans.ToList().LastOrDefault(c => c.Name == Billing.plan.name);
//            }
//            else
//            {
//                plan = new Plan(pagarMeService)
//                {
//                    Name = Billing.plan.name,
//                    Amount = (Billing.amount == null ? Billing.plan.amount.Value : Billing.amount.Value),
//                    Days = (Billing.day == null ? Billing.plan.day.Value : Billing.day.Value)
//                };
//                plan.Save();
//            }

//            var subscriptions = pagarMeService.Subscriptions.FindAll(new Subscription(pagarMeService) { CardNumber = Billing.place.card_number });
//            Subscription subscription = new Subscription(pagarMeService);
//            subscription = new Subscription(pagarMeService)
//            {
//                PaymentMethod = PaymentMethod.CreditCard,
//                CardNumber = Billing.place.card_number,
//                CardHolderName = Billing.place.card_name,
//                CardExpirationDate = Billing.place.card_date,
//                CardCvv = Billing.place.card_cvv
//            };

//            var customers = new Customer(pagarMeService)
//            {
//                Email = Billing.place.email.LastOrDefault().email1,
//                Name = Billing.place.name,
//                External_Id = Billing.place_id.ToString()
//            };

//            subscription.Plan = plan;
//            subscription.PostbackUrl = PostbackUrl + "/api/pagamento_assinatura";
//            subscription.Customer = customers;
//            PagarMe.Base.AbstractModel metadata = new PagarMe.Base.AbstractModel(pagarMeService);
//            metadata["billing_id"] = Billing.id;
//            subscription.Metadata = metadata;
//            subscription.Save();


//            return subscription;
//        }
//    }
//}