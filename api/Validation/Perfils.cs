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
    [Validator(typeof(api.Validation.perfil))]

    public partial class perfil
    {

    }
}

namespace api.Validation
{
    public class perfil : AbstractValidator<api.Models.perfil>
    {
        public perfil()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            
        }
    }
}