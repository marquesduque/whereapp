//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace api.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class compra
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public compra()
        {
            this.cartao = new HashSet<cartao>();
            this.compra_item = new HashSet<compra_item>();
            this.transacao = new HashSet<transacao>();
        }
    
        public int id { get; set; }
        public Nullable<System.DateTime> pagamento { get; set; }
        public Nullable<decimal> total { get; set; }
        public Nullable<decimal> desconto { get; set; }
        public Nullable<int> pagamento_id { get; set; }
        public Nullable<System.DateTime> preparo { get; set; }
        public Nullable<System.DateTime> entregue { get; set; }
        public Nullable<System.DateTime> finalizado { get; set; }
        public Nullable<int> status_da_compra_id { get; set; }
        public Nullable<int> filial_id { get; set; }
        public Nullable<decimal> pago { get; set; }
        public Nullable<System.DateTime> recebido { get; set; }
        public Nullable<bool> ativo { get; set; }
        public Nullable<System.DateTime> cancelamento { get; set; }
        public string pagarme_id { get; set; }
        public Nullable<int> pagarme_status { get; set; }
        public Nullable<long> place_id { get; set; }
        public Nullable<bool> balcao { get; set; }
        public Nullable<bool> delivery { get; set; }
        public string codigo_servicos { get; set; }
        public Nullable<decimal> valor_frete { get; set; }
        public Nullable<int> cartao_id { get; set; }
        public string cpf { get; set; }
        public string boleto_barcode { get; set; }
        public string boleto_url { get; set; }
        public Nullable<int> comprador_id { get; set; }
        public string tipo_frete { get; set; }
        public Nullable<int> vendedor_id { get; set; }
        public Nullable<decimal> comissao_vendedor { get; set; }
        public Nullable<long> external_id { get; set; }
        public Nullable<decimal> frete { get; set; }
        public string observacao { get; set; }
        public Nullable<int> item_id { get; set; }
        public Nullable<decimal> lat { get; set; }
        public Nullable<decimal> lng { get; set; }
        public string rua { get; set; }
        public string numero { get; set; }
        public string complemento { get; set; }
        public string cidade { get; set; }
        public string pais { get; set; }
        public string cep { get; set; }
        public string bairro { get; set; }
        public string estado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<cartao> cartao { get; set; }
        public virtual cartao cartao1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<compra_item> compra_item { get; set; }
        public virtual pagamento pagamento1 { get; set; }
        public virtual pessoa pessoa { get; set; }
        public virtual pessoa pessoa1 { get; set; }
        public virtual status_da_compra status_da_compra { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<transacao> transacao { get; set; }
    }
}
