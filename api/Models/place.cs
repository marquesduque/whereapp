﻿//------------------------------------------------------------------------------
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

    public partial class place
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public place()
        {

        }

        public long id { get; set; }
        public string name { get; set; }
        public Nullable<int> checkins { get; set; }
        public string phone { get; set; }
        public string website { get; set; }
        public Nullable<long> location_id { get; set; }
        public string search { get; set; }
        public string picture { get; set; }
        public string cover { get; set; }
        public Nullable<int> rating_count { get; set; }
        public string about { get; set; }
        public Nullable<int> hours_id { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public byte[] logo { get; set; }
        public string logo_itype { get; set; }
        public string specialty { get; set; }
        public string url { get; set; }
        public string theme { get; set; }
        public string connection { get; set; }
        public Nullable<long> place_id { get; set; }
        public string loader { get; set; }
        public string background_image_local { get; set; }
        public Nullable<bool> balcao { get; set; }
        public Nullable<bool> delivery { get; set; }
        public string primary_color { get; set; }
        public string primary_font_color { get; set; }
        public string secondary_color { get; set; }
        public string secondary_font_color { get; set; }
        public string textbox_color { get; set; }
        public string textbox_font_color { get; set; }
        public string border_radius_textbox { get; set; }
        public string border_radius_button { get; set; }
        public string light_color { get; set; }
        public string dark_color { get; set; }
        public string font_color { get; set; }
        public string card_number { get; set; }
        public string card_name { get; set; }
        public string card_date { get; set; }
        public string card_cvv { get; set; }
        public string card_hash { get; set; }
        public string card_document { get; set; }
        public string pagarme_id { get; set; }
        public string card_brand { get; set; }
        public string pagarme_status { get; set; }
        public Nullable<System.DateTime> created { get; set; }
        public Nullable<int> whatsapp { get; set; }
        public string whatsapp_message { get; set; }
        public Nullable<bool> address_required { get; set; }
        public Nullable<bool> frete_produto { get; set; }
        public byte[] icone { get; set; }
        public string icone_itype { get; set; }
        public Nullable<bool> mesa { get; set; }
        public Nullable<bool> comanda { get; set; }
        public string border_color { get; set; }
        public byte[] background { get; set; }
        public string background_itype { get; set; }
        public string bg_color { get; set; }
        public string font_light_color { get; set; }
        public string token_paggi { get; set; }
        
    }
}
