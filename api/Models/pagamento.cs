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
    
    public partial class pagamento
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public pagamento()
        {
            this.compra = new HashSet<compra>();
        }
    
        public int id { get; set; }
        public string nome { get; set; }
        public Nullable<decimal> taxa { get; set; }
        public Nullable<int> grupo_do_pagamento_id { get; set; }
        public string bandeira_id { get; set; }
        public Nullable<long> place_id { get; set; }
        public Nullable<int> transacao { get; set; }
        public string external_id { get; set; }
        public byte[] icone { get; set; }
        public string icone_itype { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<compra> compra { get; set; }
    }
}
