using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Net;
using api.Models;

namespace Utility
{
    public class Email
    {

        public static void SendEmail(string FROM, string TO, string SUBJECT, string body, string name=null, bool _catch = false)
        {
            //string BODY = System.IO.File.ReadAllText(@"C:\Projetos\Creait\Site\System\Service\Service\Client\Mkt\Marco.html");

            // Supply your SMTP credentials below. Note that your SMTP credentials are different from your AWS credentials.
            String SMTP_USERNAME = "AKIAJQARPFHEZ3IGQLYA";  // Replace with your SMTP username. 
            String SMTP_PASSWORD = "AnpxEfjJP96OsSFmhgwMnzIp8Qg5BO8V/XObLyykGKHQ";  // Replace with your SMTP password.

            // Amazon SES SMTP host name. This example uses the US West (Oregon) region.
            String HOST = "email-smtp.us-east-1.amazonaws.com";

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
                client.EnableSsl = true;

                // Send the email. 
                try
                {
                    Console.WriteLine("Attempting to send an email through the Amazon SES SMTP interface...");
                    var msg = new MailMessage(new MailAddress(FROM, name), new MailAddress(TO, ""));
                    msg.Subject = SUBJECT;
                    msg.Body = body;

                    msg.IsBodyHtml = true;
                    client.Send(msg);
                    Console.WriteLine("Email sent!");
                }
                catch (Exception ex)
                {
                    if (_catch) {
                        throw ex;
                    }
                    Console.WriteLine("The email was not sent.");
                    Console.WriteLine("Error message: " + ex.Message);
                }
            }
        }

        


        public static bool isEmailValid(string Email)
        {
            try
            {
                Regex expressaoRegex = new Regex(@"\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}");
                if (expressaoRegex.IsMatch(Email))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}