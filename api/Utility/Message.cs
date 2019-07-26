using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utility
{
    public class Alert
    {
        private ModelStateDictionary modelState { get; set; }
        public Alert(ModelStateDictionary ModelState)
        {
            modelState = ModelState;
        }
        public void Success(string Message)
        {
            modelState.Add("AlertSuccessModel", new ModelState { Value = new ValueProviderResult(null, Message, null) });
        }
        public void Delete(string Message)
        {
            modelState.Add("AlertDeleteModel", new ModelState { Value = new ValueProviderResult(null, Message, null) });
        }
    }
}