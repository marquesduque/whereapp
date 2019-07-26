using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Utility
{

    public class SNS
    {
        private Amazon.SimpleNotificationService.AmazonSimpleNotificationServiceClient _client { get; set; }
        public SNS()
        {
            AWSCredentials credential = new BasicAWSCredentials("AKIAIHSTZNZN4VLZTWHA", "0LC0H11nOkYfjAbVtaqgObOCg6rOGR1uiALtcsiR");
            _client = new AmazonSimpleNotificationServiceClient(credential, Amazon.RegionEndpoint.USEast1);
        }

        public string CreatePushEndpoint(string registrationId, int android)
        {
            if (string.IsNullOrEmpty(registrationId))
                throw new Exception("Registration id was null");

            CreatePlatformEndpointResponse resp = new CreatePlatformEndpointResponse();
            //var resp = _client.CreatePlatformEndpoint(new CreatePlatformEndpointRequest() { PlatformApplicationArn = "arn:aws:sns:us-east-1:463872800873:app/APNS_SANDBOX/Esalq", Token = registrationId });
            if (android == 0)
            {
                //ANDROID
                resp = _client.CreatePlatformEndpoint(new CreatePlatformEndpointRequest() { PlatformApplicationArn = "arn:aws:sns:us-east-1:463872800873:app/GCM/Delivery", Token = registrationId });
            }
            else
            {
                string banco = HttpContext.Current.Request.Url.Host.ToString().ToLower().Split('.')[0];
                if (banco == "192" || banco == "localhost" || banco == "10" || HttpContext.Current.Request.Url.Host.ToString().ToLower().Contains("ngrok"))
                {
                    banco = "teste";
                    resp = _client.CreatePlatformEndpoint(new CreatePlatformEndpointRequest() { PlatformApplicationArn = "arn:aws:sns:us-east-1:463872800873:app/APNS/" + banco, Token = registrationId });
                }
                else
                {
                    resp = _client.CreatePlatformEndpoint(new CreatePlatformEndpointRequest() { PlatformApplicationArn = "arn:aws:sns:us-east-1:463872800873:app/APNS/" + banco, Token = registrationId });
                }
            }

            return resp.EndpointArn;

        }

        public void SendPush(string endpointArn, string msg)
        {
            if (string.IsNullOrEmpty(endpointArn))
                return;

            var pushMsg = new PublishRequest();

            if (endpointArn.ToUpper().Contains("APNS"))
            {
                dynamic lMsg = new
                {
                    APNS = "{\"aps\":{\"alert\":\"" + msg + "\"}}"
                };
                pushMsg.MessageStructure = "json";
                pushMsg.Message = Newtonsoft.Json.JsonConvert.SerializeObject(lMsg);
                pushMsg.TargetArn = endpointArn;
            }
            else
            {
                dynamic lMsg = new
                {
                    GCM = string.Concat("{ \"data\": { \"message\": \"", msg, "\" } }")
                };
                pushMsg.MessageStructure = "json";
                pushMsg.Message = Newtonsoft.Json.JsonConvert.SerializeObject(lMsg);
                pushMsg.TargetArn = endpointArn;
            }

            try
            {
                var result = _client.Publish(pushMsg);
            }
            catch (Exception ex)
            {
                var result = ex;
            }
        }
    }
}
