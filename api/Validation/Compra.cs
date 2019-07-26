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
    [Validator(typeof(api.Validation.compra))]

    public partial class compra
    {
        public string data_range { get; set; }
        public string address { get; set; }
        public string dataInicio { get; set; }
        public string dataFim { get; set; }
    }
}

namespace api.Validation
{
    public class compra : AbstractValidator<api.Models.compra>
    {
        public compra()
        {
            RuleFor(x => x.rua).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.numero).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.cidade).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.cep).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.pais).NotEmpty().WithMessage(Messages.CampoObrigatorio);
        }
    }
}