using System.Collections.Generic;
using System.Drawing;
using System.Web;
using System.Linq;
using System.Net.Mail;
using System;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using Amazon.Runtime;
using System.Net;
using System.IO;

namespace Utility
{
    public class Base
    {
        public static HttpContext HttpContext { get; set; }
        public static string Host
        {
            get
            {
                string _host = HttpContext.Current.Request.Url.Authority;
                _host = "96778a6d.ngrok.io";
                _host = "169.254.80.80";
                _host = "192.168.0.39";
                _host = "http://www.ghop.mobi";

                return _host;
            }
        }
        public static string ResourceToJson(System.Resources.ResourceManager rm)
        {
            Dictionary<string, string> pair = new Dictionary<string, string>();
            System.Resources.ResourceSet resourceSet = rm.GetResourceSet(System.Globalization.CultureInfo.CurrentUICulture, true, true);

            resourceSet.Cast<System.Collections.DictionaryEntry>().ToDictionary(x => x.Key.ToString(), x => x.Value.ToString());

            string json = "";

            foreach (System.Collections.DictionaryEntry item in resourceSet)
            {
                if (json != "") { json += ", "; }
                json += "\"" + item.Key + "\": \"" + item.Value + "\"";
            }

            return "{ " + json + " }";
        }

        public string Email(string FROM, string TO, string SUBJECT, string BODY)
        {
            // Supply your SMTP credentials below. Note that your SMTP credentials are different from your AWS credentials.
            string SMTP_USERNAME = "atendimento@esalqlab.com.br";  // Replace with your SMTP username. 
            string SMTP_PASSWORD = "esalqlab123";  // Replace with your SMTP password.

            // Amazon SES SMTP host name. This example uses the US West (Oregon) region.
            string HOST = "smtp.esalqlab.com.br";

            // The port you will connect to on the Amazon SES SMTP endpoint. We are choosing port 587 because we will use
            // STARTTLS to encrypt the connection.
            int PORT = 587;

            // Create an SMTP client with the specified host name and port.
            using (System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient(HOST, PORT))
            {
                // Create a network credential with your SMTP user name and password.
                client.Credentials = new System.Net.NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);

                // Use SSL when accessing Amazon SES. The SMTP session will begin on an unencrypted connection, and then 
                // the client will issue a STARTTLS command to upgrade to an encrypted connection using SSL.
                client.EnableSsl = false;

                // Send the email. 
                try
                {
                    var msg = new MailMessage(FROM,
                TO, SUBJECT,
                BODY);

                    msg.IsBodyHtml = true;
                    client.Send(msg);
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            return "OK";
        }

        public static string Post(string url, string json)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }
            //try
            //{
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    return result;
                }
            //}
            //catch (Exception ex) {
            //    return "";
            //}
            return "";
        }
        public static string Get(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Timeout = int.MaxValue;
            //try
            //{
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, System.Text.Encoding.UTF8);
                    return reader.ReadToEnd();
                }
            //}
            //catch (WebException ex)
            //{
            //    WebResponse errorResponse = ex.Response;
            //    using (Stream responseStream = errorResponse.GetResponseStream())
            //    {
            //        StreamReader reader = new StreamReader(responseStream, System.Text.Encoding.GetEncoding("utf-8"));
            //        String errorText = reader.ReadToEnd();
            //        // log errorText
            //    }
            //    throw;
            //}
        }
    }

}