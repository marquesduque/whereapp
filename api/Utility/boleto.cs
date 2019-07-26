//using System;

//namespace Boleto2Net
//{
//    public class boleto
//    {
//        readonly IBanco _banco;
//        public boleto()
//        {
//            var contaBancaria = new ContaBancaria
//            {
//                Agencia = "0138",
//                DigitoAgencia = "",
//                Conta = "15050",
//                DigitoConta = "3",
//                CarteiraPadrao = "109",
//                TipoCarteiraPadrao = TipoCarteira.CarteiraCobrancaSimples,
//                TipoFormaCadastramento = TipoFormaCadastramento.ComRegistro,
//                TipoImpressaoBoleto = TipoImpressaoBoleto.Empresa
//            };
//            _banco = Banco.Instancia(Bancos.Itau);
//            _banco.Cedente = GerarCedente("", "", "", contaBancaria);

//            _banco.FormataCedente();
//        }

//        //public void Itau_109_REM400()
//        //{
//        //    Utils.TestarHomologacao(_banco, TipoArquivo.CNAB400, nameof(BancoItauCarteira109Tests), 5, true, "N", 223344);
//        //}
//        internal static Cedente GerarCedente(string codigoCedente, string digitoCodigoCedente, string codigoTransmissao, ContaBancaria contaBancaria)
//        {
//            return new Cedente
//            {
//                CPFCNPJ = "26.741.635/0001-33",
//                Nome = "Creapp",
//                Codigo = codigoCedente,
//                CodigoDV = digitoCodigoCedente,
//                Endereco = new Endereco
//                {
//                    LogradouroEndereco = "Rua Emillio Mallet",
//                    LogradouroNumero = "317",
//                    LogradouroComplemento = "Cj 213",
//                    Bairro = "Vila Gomes Cardim",
//                    Cidade = "São Paulo",
//                    UF = "SP",
//                    CEP = "03320000"
//                },
//                ContaBancaria = contaBancaria
//            };
//        }
//        internal static Sacado GerarSacado()
//        {
//            return new Sacado
//            {
//                CPFCNPJ = "443.316.101-28",
//                Nome = "Sacado Teste PF",
//                Observacoes = "Matricula 678/9",
//                Endereco = new Endereco
//                {
//                    LogradouroEndereco = "Rua Testando",
//                    LogradouroNumero = "456",
//                    Bairro = "Bairro",
//                    Cidade = "Cidade",
//                    UF = "SP",
//                    CEP = "56789012"
//                }
//            };
//            return new Sacado
//            {
//                CPFCNPJ = "71.738.978/0001-01",
//                Nome = "Sacado Teste PJ",
//                Observacoes = "Matricula 123/4",
//                Endereco = new Endereco
//                {
//                    LogradouroEndereco = "Avenida Testando",
//                    LogradouroNumero = "123",
//                    Bairro = "Bairro",
//                    Cidade = "Cidade",
//                    UF = "SP",
//                    CEP = "12345678"
//                }
//            };
//        }

//        public void valid(decimal valorTitulo, string nossoNumero, string numeroDocumento, string digitoVerificador, string nossoNumeroFormatado, string codigoDeBarras, string linhaDigitavel, params int[] anoMesDia)
//        {
//            //Ambiente
//            var boleto = new Boleto(_banco)
//            {
//                DataVencimento = new DateTime(anoMesDia[0], anoMesDia[1], anoMesDia[2]),
//                ValorTitulo = valorTitulo,
//                NossoNumero = nossoNumero,
//                NumeroDocumento = numeroDocumento,
//                EspecieDocumento = TipoEspecieDocumento.DM,
//                Sacado = GerarSacado()
//            };

//            //Ação
//            boleto.ValidarDados();

//            //Assertivas
//            //Assert.That(boleto.CodigoBarra.DigitoVerificador, Is.EqualTo(digitoVerificador), $"Dígito Verificador diferente de {digitoVerificador}");
//            //Assert.That(boleto.NossoNumeroFormatado, Is.EqualTo(nossoNumeroFormatado), "Nosso número inválido");
//            //Assert.That(boleto.CodigoBarra.CodigoDeBarras, Is.EqualTo(codigoDeBarras), "Código de Barra inválido");
//            //Assert.That(boleto.CodigoBarra.LinhaDigitavel, Is.EqualTo(linhaDigitavel), "Linha digitável inválida");
//        }

//        public Boleto GerarBoleto()
//        {

//            var boleto = new Boleto(_banco)
//            {
//                Sacado = GerarSacado(),
//                DataEmissao = DateTime.Now.AddDays(-3),
//                DataProcessamento = DateTime.Now,
//                DataVencimento = DateTime.Now.AddMonths(1),
//                ValorTitulo = (decimal)100,
//                NossoNumero = "22",
//                NumeroDocumento = "33",
//                EspecieDocumento = TipoEspecieDocumento.DM,
//                Aceite = "A",
//                CodigoInstrucao1 = "11",
//                CodigoInstrucao2 = "22",
//                DataDesconto = DateTime.Now.AddMonths(1),
//                ValorDesconto = (decimal)(100 * 0.10),
//                DataMulta = DateTime.Now.AddMonths(1),
//                PercentualMulta = (decimal)2.00,
//                ValorMulta = (decimal)(100 * (2.00 / 100)),
//                DataJuros = DateTime.Now.AddMonths(1),
//                PercentualJurosDia = (decimal)0.2,
//                ValorJurosDia = (decimal)(100 *  (0.2 / 100)),
//                MensagemArquivoRemessa = "Mensagem para o arquivo remessa",
//                NumeroControleParticipante = "CHAVEPRIMARIA="
//            };
//            // Mensagem - Instruções do Caixa
//            //StringBuilder msgCaixa = new StringBuilder();
//            //if (boleto.ValorDesconto > 0)
//            //    msgCaixa.AppendLine($"Conceder desconto de {boleto.ValorDesconto.ToString("R$ ##,##0.00")} até {boleto.DataDesconto.ToString("dd/MM/yyyy")}. ");
//            //if (boleto.ValorMulta > 0)
//            //    msgCaixa.AppendLine($"Cobrar multa de {boleto.ValorMulta.ToString("R$ ##,##0.00")} após o vencimento. ");
//            //if (boleto.ValorJurosDia > 0)
//            //    msgCaixa.AppendLine($"Cobrar juros de {boleto.ValorJurosDia.ToString("R$ ##,##0.00")} por dia de atraso. ");
//            //boleto.MensagemInstrucoesCaixa = msgCaixa.ToString();
//            // Avalista

//            boleto.Avalista = GerarSacado();
//            boleto.Avalista.Nome = boleto.Avalista.Nome.Replace("Sacado", "Avalista");

//            // Grupo Demonstrativo do Boleto
//            var grupoDemonstrativo = new GrupoDemonstrativo { Descricao = "GRUPO 1" };
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 1, Item 1", Referencia = boleto.DataEmissao.AddMonths(-1).Month + "/" + boleto.DataEmissao.AddMonths(-1).Year, Valor = boleto.ValorTitulo * (decimal)0.15 });
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 1, Item 2", Referencia = boleto.DataEmissao.AddMonths(-1).Month + "/" + boleto.DataEmissao.AddMonths(-1).Year, Valor = boleto.ValorTitulo * (decimal)0.05 });
//            boleto.Demonstrativos.Add(grupoDemonstrativo);
//            grupoDemonstrativo = new GrupoDemonstrativo { Descricao = "GRUPO 2" };
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 2, Item 1", Referencia = boleto.DataEmissao.Month + "/" + boleto.DataEmissao.Year, Valor = boleto.ValorTitulo * (decimal)0.20 });
//            boleto.Demonstrativos.Add(grupoDemonstrativo);
//            grupoDemonstrativo = new GrupoDemonstrativo { Descricao = "GRUPO 3" };
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 3, Item 1", Referencia = boleto.DataEmissao.AddMonths(-1).Month + "/" + boleto.DataEmissao.AddMonths(-1).Year, Valor = boleto.ValorTitulo * (decimal)0.37 });
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 3, Item 2", Referencia = boleto.DataEmissao.Month + "/" + boleto.DataEmissao.Year, Valor = boleto.ValorTitulo * (decimal)0.03 });
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 3, Item 3", Referencia = boleto.DataEmissao.Month + "/" + boleto.DataEmissao.Year, Valor = boleto.ValorTitulo * (decimal)0.12 });
//            grupoDemonstrativo.Itens.Add(new ItemDemonstrativo { Descricao = "Grupo 3, Item 4", Referencia = boleto.DataEmissao.AddMonths(+1).Month + "/" + boleto.DataEmissao.AddMonths(+1).Year, Valor = boleto.ValorTitulo * (decimal)0.08 });
//            boleto.Demonstrativos.Add(grupoDemonstrativo);

//            boleto.ValidarDados();
//            return boleto;
//        }
//    }
//}