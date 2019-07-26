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
    [Validator(typeof(api.Validation.responsavel_juridico))]

    public partial class responsavel_juridico
    {
        
    }
}

namespace api.Validation
{
    public class responsavel_juridico : AbstractValidator<api.Models.responsavel_juridico>
    {
        public responsavel_juridico()
        {
            RuleFor(x => x.nome).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.email).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.senha).NotEmpty().WithMessage(Messages.CampoObrigatorio);
        }
    }
}