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
    [Validator(typeof(api.Validation.item))]

    public partial class item
    {
        public string foto_str { get; set; }
        public string foto_site { get; set; }
        public string responsavel { get; set; }
        public string rastreado { get; set; }

    }
}

namespace api.Validation
{
    public class item : AbstractValidator<api.Models.item>
    {
        public item()
        {
            RuleFor(x => x.nome).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.valor).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.tipo_id).NotNull().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.responsavel_id).NotNull().WithMessage(Messages.CampoObrigatorio);

        }
    }
}