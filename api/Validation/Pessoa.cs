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
    [Validator(typeof(api.Validation.pessoa))]

    public partial class pessoa
    {
        public string foto_site { get; set; }
        public string address { get; set; }
        public string plataforma { get; set; }
        public string foto_str { get; set; }
        public string foto_itype { get; set; }
        public string notificacao_para { get; set; }
        public string msg_notificacao { get; set; }
        public object estoque_vendedor { get; set; }
        public List<comanda> comandas { get; set; }
        public object mesa { get; set; }
        public int compra_pessoa { get; set; }
        public string data_aniversario { get; set; }
        public string ativo
        {
            get
            {
                if (active == true)
                {
                    return "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>";
                }
                else if (active == false)
                {
                    return "<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>";
                }
                else
                {
                    return "<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>";
                }
            }
        }

        //MANO, ESSA AQUI SERVE PARA PODER EDITAR O ULTIMO ENDERECO QUE O CLIENTE INSERIU(ULTIMO "HORARIO"), TA AQUI POR CAUXA DO FASHION YOU, MAS ACHO QUE VAI SER UTIL PRA GERAL.

    }
    public class comanda
    {
        public comanda()
        {
        }
        public string numero { get; set; }
        public string label_numero { get; set; }
        
    }
}

namespace api.Validation
{
    public class pessoa : AbstractValidator<api.Models.pessoa>
    {
        public pessoa()
        {
            RuleFor(x => x.nome).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.email).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            RuleFor(x => x.password).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //if (api.Models.db.place.id == 1512651845703501)
            //{
            //    RuleFor(x => x.especialidade_id).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //}
            //RuleFor(x => x.rg).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //RuleFor(x => x.cpf).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //RuleFor(x => x.email).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //RuleFor(x => x.phone).NotEmpty().WithMessage(Messages.CampoObrigatorio);
            //RuleFor(x => x.mobile).NotEmpty().WithMessage(Messages.CampoObrigatorio);
        }
    }
}