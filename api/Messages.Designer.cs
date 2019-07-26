﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace api {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Messages {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Messages() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("api.Messages", typeof(Messages).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to CNPJ Inválido..
        /// </summary>
        public static string CampoCNPJ {
            get {
                return ResourceManager.GetString("CampoCNPJ", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to CPF Inválido..
        /// </summary>
        public static string CampoCPF {
            get {
                return ResourceManager.GetString("CampoCPF", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to O valor acima é inválido..
        /// </summary>
        public static string CampoInvalido {
            get {
                return ResourceManager.GetString("CampoInvalido", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to O campo acima é obrigatório..
        /// </summary>
        public static string CampoObrigatorio {
            get {
                return ResourceManager.GetString("CampoObrigatorio", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Quantidade de caracteres inválida..
        /// </summary>
        public static string CampoQuantidade {
            get {
                return ResourceManager.GetString("CampoQuantidade", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to ^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$.
        /// </summary>
        public static string RegexEmail {
            get {
                return ResourceManager.GetString("RegexEmail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to ^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$.
        /// </summary>
        public static string RegexTelefone {
            get {
                return ResourceManager.GetString("RegexTelefone", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to .
        /// </summary>
        public static string String1 {
            get {
                return ResourceManager.GetString("String1", resourceCulture);
            }
        }
    }
}
