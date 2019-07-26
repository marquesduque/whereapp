using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Site.Validation
{
    public class Base
    {
        public  class Validar
        {
            public  bool Cnpj(string vrCNPJ)
            {

                if (vrCNPJ == null)
                {
                    return false;
                }
                string CNPJ = vrCNPJ.Replace(".", ""); CNPJ = CNPJ.Replace("/", ""); CNPJ = CNPJ.Replace("-", ""); int[] digitos, soma, resultado; int nrDig; string ftmt; bool[] CNPJOk; ftmt = "6543298765432"; digitos = new int[14]; soma = new int[2]; soma[0] = 0; soma[1] = 0; resultado = new int[2]; resultado[0] = 0; resultado[1] = 0; CNPJOk = new bool[2]; CNPJOk[0] = false; CNPJOk[1] = false; try { for (nrDig = 0; nrDig < 14; nrDig++) { digitos[nrDig] = int.Parse(CNPJ.Substring(nrDig, 1)); if (nrDig <= 11) soma[0] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig + 1, 1))); if (nrDig <= 12) soma[1] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig, 1))); } for (nrDig = 0; nrDig < 2; nrDig++) { resultado[nrDig] = (soma[nrDig] % 11); if ((resultado[nrDig] == 0) || (resultado[nrDig] == 1)) CNPJOk[nrDig] = (digitos[12 + nrDig] == 0); else CNPJOk[nrDig] = (digitos[12 + nrDig] == (11 - resultado[nrDig])); } return (CNPJOk[0] && CNPJOk[1]); } catch { return false; }
            }



            /// <summary>
            /// Metodo que verifica cpf valido
            /// </summary>
            /// <param name="vrCPF">parametro de cpf</param>
            /// <returns>Retorno booleano</returns>
            private bool ValidaCPF(string vrCPF)
            {
                if (string.IsNullOrEmpty(vrCPF) || vrCPF.Replace("_", "").Length < 13)
                {
                    return false;
                }

                string valor = vrCPF.Replace(".", "");
                valor = valor.Replace("-", "");

                if (valor.Length != 11)
                    return false;

                bool igual = true;

                for (int i = 1; i < 11 && igual; i++)
                    if (valor[i] != valor[0]) igual = false;

                if (igual || valor == "12345678909")
                    return false;

                int[] numeros = new int[11];

                for (int i = 0; i < 11; i++)
                    numeros[i] = int.Parse(valor[i].ToString());

                int soma = 0;

                for (int i = 0; i < 9; i++)
                    soma += (10 - i) * numeros[i];

                int resultado = soma % 11;

                if (resultado == 1 || resultado == 0)
                {
                    if (numeros[9] != 0)
                        return false;
                }
                else if (numeros[9] != 11 - resultado)
                    return false;

                soma = 0;

                for (int i = 0; i < 10; i++)
                    soma += (11 - i) * numeros[i];

                resultado = soma % 11;

                if (resultado == 1 || resultado == 0)
                {
                    if (numeros[10] != 0)
                        return false;
                }
                else if (numeros[10] != 11 - resultado)
                    return false;

                return true;
            }

            /// <summary>
            /// Metodo que valida a quantidade de caracteres de um telefone
            /// </summary>
            /// <param name="tel"></param>
            /// <returns></returns>
            private bool IsTelefone(string tel)
            {
                if (tel == null)
                {
                    return false;
                }

                string telefoneFormat = tel.Replace("(", "").Replace(")", "").Replace("-", "").Replace("_", "");

                if (telefoneFormat.Length >= 10 && telefoneFormat.Length <= 11)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            /// <summary>
            /// Metodo que gera o código (Hash) para o código do beneficiário na operadora
            /// </summary>
            /// <param name="tel"></param>
            /// <returns></returns>
            public static string GerarHashOperadora(string NomeOperadora)
            {
                Random rdn = new Random();

                String strNumeroaleatorio = String.Empty;

                for (int i = 0; i <= 10; i++)
                {
                    if (!String.IsNullOrEmpty(strNumeroaleatorio))
                    {
                        strNumeroaleatorio += rdn.Next(0, 10).ToString();
                    }
                    else
                    {
                        strNumeroaleatorio = rdn.Next(0, 10).ToString();
                    }
                }

                return strNumeroaleatorio;
            }

            /// <summary>
            /// Metodo que trata a String para geração do código do beneficiário na operadora
            /// </summary>
            /// <param name="tel"></param>
            /// <returns></returns>
            public static String Tratamentos(String Str)
            {
                Str = Str.Replace(" ", "");
                Str = Str.Replace("-", "");
                Str = Str.Replace(".", "");
                Str = Str.Replace("á", "a");
                Str = Str.Replace("é", "e");
                Str = Str.Replace("í", "i");
                Str = Str.Replace("ó", "o");
                Str = Str.Replace("ú", "u");
                Str = Str.Replace("Á", "A");
                Str = Str.Replace("É", "E");
                Str = Str.Replace("Í", "I");
                Str = Str.Replace("Ó", "O");
                Str = Str.Replace("Ú", "U");
                Str = Str.Replace("À", "A");
                Str = Str.Replace("\\", "");
                Str = Str.Replace("/", "");
                Str = Str.Replace("ç", "c");
                Str = Str.Replace("Ç", "C");
                return Str;
            }
        }
    }
}