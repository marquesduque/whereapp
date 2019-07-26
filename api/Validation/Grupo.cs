using api;
using FluentValidation;
using FluentValidation.Attributes;
using FluentValidation.Resources;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;
using System.Web;


namespace api.Models
{
    [Validator(typeof(api.Validation.grupo))]

    public partial class grupo
    {
        public int pessoa_id { get; set; }
        
    }
}

namespace api.Validation
{
    public class grupo : AbstractValidator<api.Models.grupo>
    {
        public grupo()
        {
        }
    }
}