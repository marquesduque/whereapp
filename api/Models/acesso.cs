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
    
    public partial class acesso
    {
        public int id { get; set; }
        public Nullable<bool> create { get; set; }
        public Nullable<bool> edit { get; set; }
        public Nullable<bool> delete { get; set; }
        public Nullable<bool> list { get; set; }
        public Nullable<int> perfil_id { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string icon { get; set; }
        public string group { get; set; }
        public Nullable<int> order { get; set; }
        public Nullable<long> place_id { get; set; }
    
        public virtual perfil perfil { get; set; }
    }
}
