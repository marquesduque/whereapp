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
using System;
using System.Collections.Generic;
using System.Net;
using Uol.PagSeguro;
using Uol.PagSeguro.Constants;
using Uol.PagSeguro.Domain;
using Uol.PagSeguro.Exception;
using Uol.PagSeguro.Resources;

namespace api
{
    public class pagamentoController : ApiController
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
            bool isSandbox = false;
            EnvironmentConfiguration.ChangeEnvironment(isSandbox);

            // Instantiate a new payment request
            PaymentRequest payment = new PaymentRequest();

            // Sets the currency
            payment.Currency = Currency.Brl;

            // Add an item for this payment request
            payment.Items.Add(new Item("0001", "Notebook Prata", 1, 2430.00m));


            // Add another item for this payment request
            payment.Items.Add(new Item("0002", "Notebook Rosa", 2, 150.99m));

            // Sets a reference code for this payment request, it is useful to identify this payment in future notifications.
            payment.Reference = "REF1234";

            // Sets shipping information for this payment request
            payment.Shipping = new Shipping();
            payment.Shipping.ShippingType = ShippingType.Sedex;

            //Passando valor para ShippingCost
            payment.Shipping.Cost = 10.00m;

            payment.Shipping.Address = new Address(
                "BRA",
                "SP",
                "Sao Paulo",
                "Jardim Paulistano",
                "01452002",
                "Av. Brig. Faria Lima",
                "1384",
                "5o andar"
            );

            // Sets your customer information.
            payment.Sender = new Sender(
                "Joao Comprador",
                "comprador@uol.com.br",
                new Phone("11", "56273440")
            );

            SenderDocument document = new SenderDocument(Documents.GetDocumentByType("CPF"), "12345678909");
            payment.Sender.Documents.Add(document);

            // Sets the url used by PagSeguro for redirect user after ends checkout process
            payment.RedirectUri = new Uri("http://www.lojamodelo.com.br");

            // Add checkout metadata information
            payment.AddMetaData(MetaDataItemKeys.GetItemKeyByDescription("CPF do passageiro"), "123.456.789-09", 1);
            payment.AddMetaData("PASSENGER_PASSPORT", "23456", 1);

            // Another way to set checkout parameters
            payment.AddParameter("senderBirthday", "07/05/1980");
            payment.AddIndexedParameter("itemColor", "verde", 1);
            payment.AddIndexedParameter("itemId", "0003", 3);
            payment.AddIndexedParameter("itemDescription", "Mouse", 3);
            payment.AddIndexedParameter("itemQuantity", "1", 3);
            payment.AddIndexedParameter("itemAmount", "200.00", 3);

            // Add discount per payment method
            payment.AddPaymentMethodConfig(PaymentMethodConfigKeys.DiscountPercent, 50.00, PaymentMethodGroup.CreditCard);

            // Add installment without addition per payment method
            payment.AddPaymentMethodConfig(PaymentMethodConfigKeys.MaxInstallmentsNoInterest, 6, PaymentMethodGroup.CreditCard);

            // Add installment limit per payment method
            payment.AddPaymentMethodConfig(PaymentMethodConfigKeys.MaxInstallmentsLimit, 8, PaymentMethodGroup.CreditCard);

            //// Add and remove groups and payment methods
            //List<string> accept = new List<string>();
            //accept.Add(ListPaymentMethodNames.DebitoItau);
            //accept.Add(ListPaymentMethodNames.DebitoHSBC);
            //payment.AcceptPaymentMethodConfig(ListPaymentMethodGroups.CreditCard, accept);

            //List<string> exclude = new List<string>();
            //exclude.Add(ListPaymentMethodNames.Boleto);
            //payment.ExcludePaymentMethodConfig(ListPaymentMethodGroups.Boleto, exclude);

            try
            {
                /// Create new account credentials
                /// This configuration let you set your credentials from your ".cs" file.
                AccountCredentials credentials = new AccountCredentials("backoffice@lojamodelo.com.br", "256422BF9E66458CA3FE41189AD1C94A");

                /// @todo with you want to get credentials from xml config file uncommend the line below and comment the line above.
                //AccountCredentials credentials = PagSeguroConfiguration.Credentials(isSandbox);

                Uri paymentRedirectUri = payment.Register(credentials);

                Console.WriteLine("URL do pagamento : " + paymentRedirectUri);
                Console.ReadKey();
                return Ok(0);
            }
            catch (PagSeguroServiceException exception)
            {
                Console.WriteLine(exception.Message + "\n");

                foreach (ServiceError element in exception.Errors)
                {
                    Console.WriteLine(element + "\n");
                }
                Console.ReadKey();

                return Ok(1);
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