/****** Object:  Table [dbo].[acesso]    Script Date: 26/09/2018 07:50:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[acesso](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[create] [bit] NULL,
	[edit] [bit] NULL,
	[delete] [bit] NULL,
	[list] [bit] NULL,
	[perfil_id] [int] NULL,
	[url] [varchar](350) NULL,
	[name] [varchar](350) NULL,
	[icon] [varchar](50) NULL,
	[group] [varchar](150) NULL,
	[order] [int] NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_acesso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[agenda]    Script Date: 26/09/2018 07:50:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[agenda](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](500) NULL,
	[descricao] [varchar](4000) NULL,
	[ativo] [bit] NULL,
	[place_id] [bigint] NULL,
	[seg_inicio] [time](0) NULL,
	[seg_fim] [time](0) NULL,
	[ter_inicio] [time](0) NULL,
	[ter_fim] [time](0) NULL,
	[qua_inicio] [time](0) NULL,
	[qua_fim] [time](0) NULL,
	[qui_inicio] [time](0) NULL,
	[qui_fim] [time](0) NULL,
	[sex_inicio] [time](0) NULL,
	[sex_fim] [time](0) NULL,
	[sab_inicio] [time](0) NULL,
	[sab_fim] [time](0) NULL,
	[dom_inicio] [time](0) NULL,
	[dom_fim] [time](0) NULL,
	[administrador_id] [int] NULL,
 CONSTRAINT [PK_agenda] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bandeira]    Script Date: 26/09/2018 07:50:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bandeira](
	[id] [varchar](50) NOT NULL,
	[nome] [varchar](500) NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_bandeira] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[biblioteca_de_palavra]    Script Date: 26/09/2018 07:50:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[biblioteca_de_palavra](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[url] [varchar](500) NULL,
	[name] [varchar](500) NULL,
	[description] [varchar](500) NULL,
	[col] [bit] NULL,
	[col_description] [varchar](500) NULL,
	[size] [int] NULL,
	[place_id] [bigint] NULL,
	[edit] [bit] NULL,
 CONSTRAINT [PK_biblioteca_de_palavras] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[caracteristica]    Script Date: 26/09/2018 07:50:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[caracteristica](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](500) NULL,
	[place_id] [bigint] NULL,
	[tipo] [varchar](250) NULL,
 CONSTRAINT [PK_caracteristica] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cartao]    Script Date: 26/09/2018 07:50:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cartao](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[numero] [varchar](500) NULL,
	[nome] [varchar](500) NULL,
	[expiracao] [varchar](50) NULL,
	[cvv] [varchar](50) NULL,
	[hash] [varchar](500) NULL,
	[pessoa_id] [int] NULL,
	[documento] [varchar](100) NULL,
	[pagarme_id] [varchar](50) NULL,
	[bandeira] [varchar](50) NULL,
 CONSTRAINT [PK_cartao] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[complemento]    Script Date: 26/09/2018 07:50:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[complemento](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[montagem_id] [int] NULL,
	[product_id] [int] NULL,
	[preco] [decimal](18, 2) NULL,
	[icone] [image] NULL,
	[icone_itype] [varchar](50) NULL,
	[place_id] [bigint] NULL,
	[external_id] [int] NULL,
 CONSTRAINT [PK_complemento] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[compra]    Script Date: 26/09/2018 07:50:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[compra](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[pagamento] [datetime] NULL,
	[total] [decimal](18, 2) NULL,
	[desconto] [decimal](18, 2) NULL,
	[pagamento_id] [int] NULL,
	[preparo] [datetime] NULL,
	[entregue] [datetime] NULL,
	[finalizado] [datetime] NULL,
	[status_da_compra_id] [int] NULL,
	[filial_id] [int] NULL,
	[pago] [decimal](18, 2) NULL,
	[recebido] [datetime] NULL,
	[ativo] [bit] NULL,
	[cancelamento] [datetime] NULL,
	[pagarme_id] [varchar](50) NULL,
	[pagarme_status] [varchar](50) NULL,
	[place_id] [bigint] NULL,
	[balcao] [bit] NULL,
	[delivery] [bit] NULL,
	[codigo_servicos] [varchar](50) NULL,
	[valor_frete] [decimal](18, 2) NULL,
	[cartao_id] [int] NULL,
	[cpf] [varchar](100) NULL,
	[boleto_barcode] [varchar](500) NULL,
	[boleto_url] [varchar](500) NULL,
	[comprador_id] [int] NULL,
	[tipo_frete] [varchar](150) NULL,
	[vendedor_id] [int] NULL,
	[comissao_vendedor] [decimal](18, 2) NULL,
	[external_id] [bigint] NULL,
	[frete] [decimal](18, 2) NULL,
	[observacao] [varchar](450) NULL,
 CONSTRAINT [PK_compra] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cor]    Script Date: 26/09/2018 07:50:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cor](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](50) NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_cor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[desconto]    Script Date: 26/09/2018 07:50:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[desconto](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[valor] [decimal](18, 2) NULL,
	[inicio] [datetime] NULL,
	[fim] [datetime] NULL,
	[segunda] [bit] NULL,
	[terca] [bit] NULL,
	[quarta] [bit] NULL,
	[quinta] [bit] NULL,
	[sexta] [bit] NULL,
	[sabado] [bit] NULL,
	[domingo] [bit] NULL,
	[nome] [varchar](250) NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_desconto] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[endereco]    Script Date: 26/09/2018 07:50:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[endereco](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[cep] [varchar](250) NULL,
	[street] [varchar](4000) NULL,
	[number] [varchar](250) NULL,
	[complement] [varchar](250) NULL,
	[city] [varchar](250) NULL,
	[district] [varchar](250) NULL,
	[state] [varchar](250) NULL,
	[country] [varchar](250) NULL,
	[lat] [decimal](20, 12) NULL,
	[lng] [decimal](20, 12) NULL,
	[ultimo_pedido] [datetime] NULL,
	[pessoa_id] [int] NULL,
	[active] [bit] NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_endereco] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estoque]    Script Date: 26/09/2018 07:50:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estoque](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[produto_id] [int] NULL,
	[data_saida] [datetime] NULL,
	[estoque] [int] NULL,
	[ativo] [bit] NULL,
	[data_entrada] [datetime] NULL,
	[data_processamento] [datetime] NULL,
	[pessoa_id] [int] NULL,
	[place_id] [bigint] NULL,
	[lote] [bigint] NULL,
 CONSTRAINT [PK_estoque] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[filial]    Script Date: 26/09/2018 07:50:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[filial](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[matriz_id] [int] NULL,
	[nome] [varchar](250) NULL,
	[lat] [decimal](20, 12) NULL,
	[lng] [decimal](20, 12) NULL,
	[endereco] [varchar](250) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](850) NULL,
	[cidade] [varchar](250) NULL,
	[administrador_id] [int] NULL,
	[telefone] [varchar](50) NULL,
	[celular] [varchar](50) NULL,
	[logo] [image] NULL,
	[background] [image] NULL,
	[pais] [varchar](250) NULL,
	[logo_itype] [varchar](50) NULL,
	[background_itype] [varchar](50) NULL,
	[distancia] [int] NULL,
	[valor_resgate_minimo] [decimal](18, 2) NULL,
	[resgate_minimo] [int] NULL,
	[Agencia] [varchar](50) NULL,
	[AgenciaDv] [varchar](50) NULL,
	[Conta] [varchar](50) NULL,
	[ContaDv] [varchar](50) NULL,
	[BankCode] [varchar](50) NULL,
	[DocumentNumber] [varchar](50) NULL,
	[LegalName] [varchar](50) NULL,
	[cor_id] [int] NULL,
	[loader] [varchar](250) NULL,
	[background_image_local] [varchar](250) NULL,
	[tipo_estabelecimento] [varchar](250) NULL,
	[place_id] [bigint] NULL,
	[delivery] [bit] NULL,
	[balcao] [bit] NULL,
	[versao] [int] NULL,
	[tempoentrega] [int] NULL,
	[codigo_contrato] [varchar](100) NULL,
	[senha_contrato] [varchar](50) NULL,
	[tipo_embalagem] [int] NULL,
	[mao_propria] [bit] NULL,
	[valor_declarado] [decimal](18, 3) NULL,
	[aviso_recebimento] [bit] NULL,
	[cep] [varchar](50) NULL,
	[taxa_cartao] [int] NULL,
	[taxa_boleto] [int] NULL,
	[correios] [bit] NULL,
	[entrega_distancia_maxima] [int] NULL,
	[entrega_distancia_gratis] [int] NULL,
	[entraga_valor_km] [decimal](18, 2) NULL,
	[entraga_cep_bloqueado] [varchar](8000) NULL,
	[connection_string] [varchar](5000) NULL,
	[external_id] [uniqueidentifier] NULL,
	[seg1] [time](7) NULL,
	[seg2] [time](7) NULL,
	[seg3] [time](7) NULL,
	[seg4] [time](7) NULL,
	[ter1] [time](7) NULL,
	[ter2] [time](7) NULL,
	[ter3] [time](7) NULL,
	[ter4] [time](7) NULL,
	[qua1] [time](7) NULL,
	[qua2] [time](7) NULL,
	[qua3] [time](7) NULL,
	[qua4] [time](7) NULL,
	[qui1] [time](7) NULL,
	[qui2] [time](7) NULL,
	[qui3] [time](7) NULL,
	[qui4] [time](7) NULL,
	[sex1] [time](7) NULL,
	[sex2] [time](7) NULL,
	[sex3] [time](7) NULL,
	[sex4] [time](7) NULL,
	[sab1] [time](7) NULL,
	[sab2] [time](7) NULL,
	[sab3] [time](7) NULL,
	[sab4] [time](7) NULL,
	[dom1] [time](7) NULL,
	[dom2] [time](7) NULL,
	[dom3] [time](7) NULL,
	[dom4] [time](7) NULL,
	[aberto] [bit] NULL,
	[data_fechado] [varchar](max) NULL,
	[minimo] [decimal](18, 2) NULL,
 CONSTRAINT [PK_filial] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[filial_produto]    Script Date: 26/09/2018 07:50:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[filial_produto](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[produto_id] [int] NULL,
	[filial_id] [int] NULL,
 CONSTRAINT [PK_filial_produto] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grupo_do_pagamento]    Script Date: 26/09/2018 07:50:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grupo_do_pagamento](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
	[place_id] [bigint] NULL,
	[app] [bit] NULL,
 CONSTRAINT [PK_grupo_do_pagamento] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[horario]    Script Date: 26/09/2018 07:50:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[horario](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[agenda_id] [int] NULL,
	[cliente_id] [int] NULL,
	[horario] [datetime] NULL,
	[duracao] [int] NULL,
	[ativo] [bit] NULL,
	[desistencia] [datetime] NULL,
	[motivo] [varchar](1000) NULL,
	[lat] [decimal](20, 12) NULL,
	[lng] [decimal](20, 12) NULL,
	[endereco] [varchar](250) NULL,
	[numero] [varchar](10) NULL,
	[complemento] [varchar](850) NULL,
	[cidade] [varchar](250) NULL,
	[pais] [varchar](250) NULL,
	[cep] [varchar](250) NULL,
	[place_id] [bigint] NULL,
	[compra_id] [int] NULL,
	[avaliacao] [int] NULL,
	[bairro] [varchar](1000) NULL,
 CONSTRAINT [PK_horario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mensagens]    Script Date: 26/09/2018 07:50:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mensagens](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[horario_id] [int] NULL,
	[atendente_id] [int] NULL,
	[mensagem] [varchar](4000) NULL,
	[documento] [image] NULL,
	[perfil_da_mensagem] [int] NULL,
	[documento_itype] [varchar](50) NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_mensagens] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[montagem]    Script Date: 26/09/2018 07:50:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[montagem](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
	[description] [varchar](250) NULL,
	[preco] [decimal](18, 2) NULL,
	[ordem] [int] NULL,
	[icone] [image] NULL,
	[proximo_id] [int] NULL,
	[icone_type] [varchar](50) NULL,
	[max] [int] NULL,
	[min] [int] NULL,
	[produto_id] [int] NULL,
	[ativo] [bit] NULL,
	[place_id] [bigint] NULL,
	[external_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_montagem] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pagamento]    Script Date: 26/09/2018 07:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pagamento](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
	[taxa] [decimal](18, 2) NULL,
	[grupo_do_pagamento_id] [int] NULL,
	[bandeira_id] [varchar](50) NULL,
	[place_id] [bigint] NULL,
	[transacao] [int] NULL,
	[external_id] [varchar](50) NULL,
	[icone] [image] NULL,
	[icone_itype] [varchar](50) NULL,
 CONSTRAINT [PK_pagamento] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pedido]    Script Date: 26/09/2018 07:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pedido](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[produto_id] [int] NULL,
	[preco] [decimal](18, 2) NULL,
	[desconto] [decimal](18, 2) NULL,
	[complemento_de] [int] NULL,
	[montagem_id] [int] NULL,
	[compra_id] [int] NULL,
	[observacao] [varchar](500) NULL,
	[place_id] [bigint] NULL,
	[horario_id] [int] NULL,
	[comanda] [varchar](10) NULL,
	[recebido] [datetime] NULL,
	[preparo] [datetime] NULL,
	[finalizado] [datetime] NULL,
	[entregue] [datetime] NULL,
 CONSTRAINT [PK_pedido] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perfil]    Script Date: 26/09/2018 07:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perfil](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[name] [varchar](500) NULL,
 CONSTRAINT [PK_perfil] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pessoa]    Script Date: 26/09/2018 07:50:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pessoa](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](500) NULL,
	[email] [varchar](4000) NULL,
	[birthday] [datetime] NULL,
	[facebook] [varchar](4000) NULL,
	[cpf] [varchar](100) NULL,
	[rg] [varchar](100) NULL,
	[perfil_id] [int] NULL,
	[phone] [varchar](50) NULL,
	[phone_optional] [varchar](50) NULL,
	[mobile] [varchar](50) NULL,
	[mobile_optional] [varchar](50) NULL,
	[rating] [int] NULL,
	[password] [varchar](50) NULL,
	[photo] [image] NULL,
	[description] [varchar](4000) NULL,
	[active] [bit] NULL,
	[charge] [varchar](150) NULL,
	[email_change] [datetime] NULL,
	[status_pessoa_id] [int] NULL,
	[photo_itype] [varchar](50) NULL,
	[push_id] [varchar](300) NULL,
	[push_arn] [varchar](300) NULL,
	[credit] [decimal](18, 2) NULL,
	[cnpj] [varchar](100) NULL,
	[razao_social] [varchar](100) NULL,
	[vendedor_id] [int] NULL,
	[place_id] [bigint] NULL,
	[Agencia] [varchar](50) NULL,
	[AgenciaDv] [varchar](50) NULL,
	[Conta] [varchar](50) NULL,
	[ContaDv] [varchar](50) NULL,
	[BankCode] [varchar](50) NULL,
	[DocumentNumber] [varchar](50) NULL,
	[LegalName] [varchar](50) NULL,
	[comissao] [decimal](18, 2) NULL,
	[pagarme_id] [varchar](50) NULL,
	[created] [datetime] NULL,
	[external_id] [int] NULL,
	[filial_id] [int] NULL,
	[cpf_image] [image] NULL,
	[cpf_image_itype] [varchar](50) NULL,
	[rg_image] [image] NULL,
	[rg_image_itype] [varchar](50) NULL,
	[comprovante] [image] NULL,
	[comprovante_itype] [varchar](50) NULL,
 CONSTRAINT [PK_pessoa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pontos]    Script Date: 26/09/2018 07:50:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pontos](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[filial_id] [int] NULL,
	[pessoa_id] [int] NULL,
	[quantidade] [int] NULL,
	[criacao] [datetime] NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_pontos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[produto]    Script Date: 26/09/2018 07:50:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[produto](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
	[preco] [decimal](18, 2) NULL,
	[descricao] [varchar](350) NULL,
	[icone] [image] NULL,
	[desconto_id] [int] NULL,
	[tipo_id] [int] NULL,
	[status] [bit] NULL,
	[duracao] [int] NULL,
	[icone_itype] [varchar](50) NULL,
	[buscavel] [bit] NULL,
	[estoque] [int] NULL,
	[comissao] [decimal](18, 0) NULL,
	[codigo] [varchar](50) NULL,
	[place_id] [bigint] NULL,
	[valorcompra] [decimal](18, 2) NULL,
	[porcentagemlucro] [decimal](18, 2) NULL,
	[valor_revenda] [decimal](18, 2) NULL,
	[peso] [decimal](18, 3) NULL,
	[comprimento] [decimal](18, 3) NULL,
	[altura] [decimal](18, 3) NULL,
	[largura] [decimal](18, 3) NULL,
	[diametro] [decimal](18, 3) NULL,
	[comissao_vendedor] [decimal](18, 2) NULL,
	[destaque] [int] NULL,
	[observacao] [varchar](250) NULL,
	[external_id] [int] NULL,
	[data_entrada] [datetime] NULL,
	[tipo_de_preparo_id] [int] NULL,
	[agenda_id] [int] NULL,
	[administrador_id] [int] NULL,
	[avaliacao] [int] NULL,
	[avaliacao_quantidade] [int] NULL,
 CONSTRAINT [PK_produto] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[produto_caracteristica]    Script Date: 26/09/2018 07:50:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[produto_caracteristica](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[caracteristica_id] [int] NULL,
	[place_id] [bigint] NULL,
	[produto_id] [int] NULL,
 CONSTRAINT [PK_produto_caracteristica] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[resgate]    Script Date: 26/09/2018 07:50:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[resgate](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[pontos_id] [int] NULL,
	[criacao] [datetime] NULL,
	[quantidade] [int] NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_resgate] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status_da_compra]    Script Date: 26/09/2018 07:50:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status_da_compra](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
 CONSTRAINT [PK_status_da_compra] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status_pessoa]    Script Date: 26/09/2018 07:50:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status_pessoa](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[name] [varchar](50) NULL,
 CONSTRAINT [PK_status_pessoa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo]    Script Date: 26/09/2018 07:50:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](250) NULL,
	[icone] [image] NULL,
	[icone_itype] [varchar](50) NULL,
	[background] [image] NULL,
	[background_itype] [varchar](50) NULL,
	[descricao] [varchar](250) NULL,
	[buscavel] [bit] NULL,
	[ativo] [bit] NULL,
	[place_id] [bigint] NULL,
	[external_id] [int] NULL,
	[ordem] [int] NULL,
 CONSTRAINT [PK_tipo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_de_preparo]    Script Date: 26/09/2018 07:50:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_de_preparo](
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[nome] [varchar](450) NULL,
	[ativo] [bit] NULL,
	[place_id] [bigint] NULL,
 CONSTRAINT [PK_tipo_de_preparo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[acesso]  WITH CHECK ADD  CONSTRAINT [FK_acesso_perfil] FOREIGN KEY([perfil_id])
REFERENCES [dbo].[perfil] ([id])
GO
ALTER TABLE [dbo].[acesso] CHECK CONSTRAINT [FK_acesso_perfil]
GO
ALTER TABLE [dbo].[agenda]  WITH CHECK ADD  CONSTRAINT [FK_agenda_pessoa] FOREIGN KEY([administrador_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[agenda] CHECK CONSTRAINT [FK_agenda_pessoa]
GO
ALTER TABLE [dbo].[cartao]  WITH CHECK ADD  CONSTRAINT [FK_cartao_pessoa] FOREIGN KEY([pessoa_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[cartao] CHECK CONSTRAINT [FK_cartao_pessoa]
GO
ALTER TABLE [dbo].[complemento]  WITH CHECK ADD  CONSTRAINT [FK_complemento_montagem] FOREIGN KEY([montagem_id])
REFERENCES [dbo].[montagem] ([id])
GO
ALTER TABLE [dbo].[complemento] CHECK CONSTRAINT [FK_complemento_montagem]
GO
ALTER TABLE [dbo].[complemento]  WITH CHECK ADD  CONSTRAINT [FK_complemento_produto] FOREIGN KEY([product_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[complemento] CHECK CONSTRAINT [FK_complemento_produto]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_cartao] FOREIGN KEY([cartao_id])
REFERENCES [dbo].[cartao] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_cartao]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_filial] FOREIGN KEY([filial_id])
REFERENCES [dbo].[filial] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_filial]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_pagamento] FOREIGN KEY([pagamento_id])
REFERENCES [dbo].[pagamento] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_pagamento]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_pessoa] FOREIGN KEY([comprador_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_pessoa]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_pessoa1] FOREIGN KEY([vendedor_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_pessoa1]
GO
ALTER TABLE [dbo].[compra]  WITH CHECK ADD  CONSTRAINT [FK_compra_status_da_compra] FOREIGN KEY([status_da_compra_id])
REFERENCES [dbo].[status_da_compra] ([id])
GO
ALTER TABLE [dbo].[compra] CHECK CONSTRAINT [FK_compra_status_da_compra]
GO
ALTER TABLE [dbo].[endereco]  WITH CHECK ADD  CONSTRAINT [FK_endereco_pessoa] FOREIGN KEY([pessoa_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[endereco] CHECK CONSTRAINT [FK_endereco_pessoa]
GO
ALTER TABLE [dbo].[estoque]  WITH CHECK ADD  CONSTRAINT [FK_estoque_pessoa] FOREIGN KEY([pessoa_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[estoque] CHECK CONSTRAINT [FK_estoque_pessoa]
GO
ALTER TABLE [dbo].[estoque]  WITH CHECK ADD  CONSTRAINT [FK_estoque_produto] FOREIGN KEY([produto_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[estoque] CHECK CONSTRAINT [FK_estoque_produto]
GO
ALTER TABLE [dbo].[filial]  WITH CHECK ADD  CONSTRAINT [FK_filial_cor] FOREIGN KEY([cor_id])
REFERENCES [dbo].[cor] ([id])
GO
ALTER TABLE [dbo].[filial] CHECK CONSTRAINT [FK_filial_cor]
GO
ALTER TABLE [dbo].[filial]  WITH CHECK ADD  CONSTRAINT [FK_filial_filial] FOREIGN KEY([matriz_id])
REFERENCES [dbo].[filial] ([id])
GO
ALTER TABLE [dbo].[filial] CHECK CONSTRAINT [FK_filial_filial]
GO
ALTER TABLE [dbo].[filial]  WITH CHECK ADD  CONSTRAINT [FK_filial_pessoa] FOREIGN KEY([administrador_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[filial] CHECK CONSTRAINT [FK_filial_pessoa]
GO
ALTER TABLE [dbo].[filial_produto]  WITH CHECK ADD  CONSTRAINT [FK_filial_produto_filial] FOREIGN KEY([filial_id])
REFERENCES [dbo].[filial] ([id])
GO
ALTER TABLE [dbo].[filial_produto] CHECK CONSTRAINT [FK_filial_produto_filial]
GO
ALTER TABLE [dbo].[filial_produto]  WITH CHECK ADD  CONSTRAINT [FK_filial_produto_produto] FOREIGN KEY([produto_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[filial_produto] CHECK CONSTRAINT [FK_filial_produto_produto]
GO
ALTER TABLE [dbo].[horario]  WITH CHECK ADD  CONSTRAINT [FK_horario_agenda] FOREIGN KEY([agenda_id])
REFERENCES [dbo].[agenda] ([id])
GO
ALTER TABLE [dbo].[horario] CHECK CONSTRAINT [FK_horario_agenda]
GO
ALTER TABLE [dbo].[horario]  WITH CHECK ADD  CONSTRAINT [FK_horario_compra] FOREIGN KEY([compra_id])
REFERENCES [dbo].[compra] ([id])
GO
ALTER TABLE [dbo].[horario] CHECK CONSTRAINT [FK_horario_compra]
GO
ALTER TABLE [dbo].[horario]  WITH CHECK ADD  CONSTRAINT [FK_horario_pessoa] FOREIGN KEY([cliente_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[horario] CHECK CONSTRAINT [FK_horario_pessoa]
GO
ALTER TABLE [dbo].[mensagens]  WITH CHECK ADD  CONSTRAINT [FK_mensagens_horario] FOREIGN KEY([horario_id])
REFERENCES [dbo].[horario] ([id])
GO
ALTER TABLE [dbo].[mensagens] CHECK CONSTRAINT [FK_mensagens_horario]
GO
ALTER TABLE [dbo].[mensagens]  WITH CHECK ADD  CONSTRAINT [FK_mensagens_pessoa] FOREIGN KEY([atendente_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[mensagens] CHECK CONSTRAINT [FK_mensagens_pessoa]
GO
ALTER TABLE [dbo].[montagem]  WITH CHECK ADD  CONSTRAINT [FK_montagem_montagem] FOREIGN KEY([proximo_id])
REFERENCES [dbo].[montagem] ([id])
GO
ALTER TABLE [dbo].[montagem] CHECK CONSTRAINT [FK_montagem_montagem]
GO
ALTER TABLE [dbo].[montagem]  WITH CHECK ADD  CONSTRAINT [FK_montagem_produto] FOREIGN KEY([produto_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[montagem] CHECK CONSTRAINT [FK_montagem_produto]
GO
ALTER TABLE [dbo].[pagamento]  WITH CHECK ADD  CONSTRAINT [FK_pagamento_bandeira] FOREIGN KEY([bandeira_id])
REFERENCES [dbo].[bandeira] ([id])
GO
ALTER TABLE [dbo].[pagamento] CHECK CONSTRAINT [FK_pagamento_bandeira]
GO
ALTER TABLE [dbo].[pagamento]  WITH CHECK ADD  CONSTRAINT [FK_pagamento_grupo_do_pagamento] FOREIGN KEY([grupo_do_pagamento_id])
REFERENCES [dbo].[grupo_do_pagamento] ([id])
GO
ALTER TABLE [dbo].[pagamento] CHECK CONSTRAINT [FK_pagamento_grupo_do_pagamento]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [FK_pedido_compra] FOREIGN KEY([compra_id])
REFERENCES [dbo].[compra] ([id])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [FK_pedido_compra]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [FK_pedido_horario] FOREIGN KEY([horario_id])
REFERENCES [dbo].[horario] ([id])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [FK_pedido_horario]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [FK_pedido_montagem] FOREIGN KEY([montagem_id])
REFERENCES [dbo].[montagem] ([id])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [FK_pedido_montagem]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [FK_pedido_pedido] FOREIGN KEY([complemento_de])
REFERENCES [dbo].[pedido] ([id])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [FK_pedido_pedido]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [FK_pedido_produto] FOREIGN KEY([produto_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [FK_pedido_produto]
GO
ALTER TABLE [dbo].[pessoa]  WITH CHECK ADD  CONSTRAINT [FK_pessoa_filial] FOREIGN KEY([filial_id])
REFERENCES [dbo].[filial] ([id])
GO
ALTER TABLE [dbo].[pessoa] CHECK CONSTRAINT [FK_pessoa_filial]
GO
ALTER TABLE [dbo].[pessoa]  WITH CHECK ADD  CONSTRAINT [FK_pessoa_pessoa] FOREIGN KEY([vendedor_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[pessoa] CHECK CONSTRAINT [FK_pessoa_pessoa]
GO
ALTER TABLE [dbo].[pessoa]  WITH CHECK ADD  CONSTRAINT [FK_user_status_pessoa] FOREIGN KEY([status_pessoa_id])
REFERENCES [dbo].[status_pessoa] ([id])
GO
ALTER TABLE [dbo].[pessoa] CHECK CONSTRAINT [FK_user_status_pessoa]
GO
ALTER TABLE [dbo].[pessoa]  WITH CHECK ADD  CONSTRAINT [FK_pessoa_perfil] FOREIGN KEY([perfil_id])
REFERENCES [dbo].[perfil] ([id])
GO
ALTER TABLE [dbo].[pessoa] CHECK CONSTRAINT [FK_pessoa_perfil]
GO
ALTER TABLE [dbo].[pontos]  WITH CHECK ADD  CONSTRAINT [FK_pontos_filial] FOREIGN KEY([filial_id])
REFERENCES [dbo].[filial] ([id])
GO
ALTER TABLE [dbo].[pontos] CHECK CONSTRAINT [FK_pontos_filial]
GO
ALTER TABLE [dbo].[pontos]  WITH CHECK ADD  CONSTRAINT [FK_pontos_pessoa] FOREIGN KEY([pessoa_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[pontos] CHECK CONSTRAINT [FK_pontos_pessoa]
GO
ALTER TABLE [dbo].[produto]  WITH CHECK ADD  CONSTRAINT [FK_produto_agenda] FOREIGN KEY([agenda_id])
REFERENCES [dbo].[agenda] ([id])
GO
ALTER TABLE [dbo].[produto] CHECK CONSTRAINT [FK_produto_agenda]
GO
ALTER TABLE [dbo].[produto]  WITH CHECK ADD  CONSTRAINT [FK_produto_desconto] FOREIGN KEY([desconto_id])
REFERENCES [dbo].[desconto] ([id])
GO
ALTER TABLE [dbo].[produto] CHECK CONSTRAINT [FK_produto_desconto]
GO
ALTER TABLE [dbo].[produto]  WITH CHECK ADD  CONSTRAINT [FK_produto_pessoa] FOREIGN KEY([administrador_id])
REFERENCES [dbo].[pessoa] ([id])
GO
ALTER TABLE [dbo].[produto] CHECK CONSTRAINT [FK_produto_pessoa]
GO
ALTER TABLE [dbo].[produto]  WITH CHECK ADD  CONSTRAINT [FK_produto_tipo] FOREIGN KEY([tipo_id])
REFERENCES [dbo].[tipo] ([id])
GO
ALTER TABLE [dbo].[produto] CHECK CONSTRAINT [FK_produto_tipo]
GO
ALTER TABLE [dbo].[produto]  WITH CHECK ADD  CONSTRAINT [FK_produto_tipo_de_preparo] FOREIGN KEY([tipo_de_preparo_id])
REFERENCES [dbo].[tipo_de_preparo] ([id])
GO
ALTER TABLE [dbo].[produto] CHECK CONSTRAINT [FK_produto_tipo_de_preparo]
GO
ALTER TABLE [dbo].[produto_caracteristica]  WITH CHECK ADD  CONSTRAINT [FK_produto_caracteristica_caracteristica] FOREIGN KEY([caracteristica_id])
REFERENCES [dbo].[caracteristica] ([id])
GO
ALTER TABLE [dbo].[produto_caracteristica] CHECK CONSTRAINT [FK_produto_caracteristica_caracteristica]
GO
ALTER TABLE [dbo].[produto_caracteristica]  WITH CHECK ADD  CONSTRAINT [FK_produto_caracteristica_produto1] FOREIGN KEY([produto_id])
REFERENCES [dbo].[produto] ([id])
GO
ALTER TABLE [dbo].[produto_caracteristica] CHECK CONSTRAINT [FK_produto_caracteristica_produto1]
GO
ALTER TABLE [dbo].[resgate]  WITH CHECK ADD  CONSTRAINT [FK_resgate_pontos] FOREIGN KEY([pontos_id])
REFERENCES [dbo].[pontos] ([id])
GO
ALTER TABLE [dbo].[resgate] CHECK CONSTRAINT [FK_resgate_pontos]
GO
/****** Object:  StoredProcedure [dbo].[alterar_place_id]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[alterar_place_id]
(
@place_id_novo bigint,
@place_id_antigo bigint
)
as
update acesso set place_id = @place_id_novo	where place_id = @place_id_antigo;
update agenda set place_id = @place_id_novo	where place_id = @place_id_antigo;
update bandeira set place_id = @place_id_novo where place_id = @place_id_antigo;	 
update biblioteca_de_palavra set place_id = @place_id_novo where place_id = @place_id_antigo;
update complemento set place_id = @place_id_novo where place_id = @place_id_antigo;
update compra set place_id = @place_id_novo where place_id = @place_id_antigo;
update cor set place_id = @place_id_novo where place_id = @place_id_antigo;
update desconto set place_id = @place_id_novo where place_id = @place_id_antigo;
update endereco set place_id = @place_id_novo where place_id = @place_id_antigo;
update estoque set place_id = @place_id_novo where place_id = @place_id_antigo;
update filial set place_id = @place_id_novo where place_id = @place_id_antigo;
update grupo_do_pagamento set place_id = @place_id_novo where place_id = @place_id_antigo;
update horario set place_id = @place_id_novo where place_id = @place_id_antigo;
update mensagens set place_id = @place_id_novo where place_id = @place_id_antigo;
update montagem set place_id = @place_id_novo where place_id = @place_id_antigo;
update pagamento set place_id = @place_id_novo where place_id = @place_id_antigo;
update pedido set place_id = @place_id_novo where place_id = @place_id_antigo;
update pessoa set place_id = @place_id_novo	where place_id = @place_id_antigo;
update pontos set place_id = @place_id_novo where place_id = @place_id_antigo;
update produto set place_id = @place_id_novo where place_id = @place_id_antigo;
update resgate set place_id = @place_id_novo where place_id = @place_id_antigo;
update tipo set place_id = @place_id_novo where place_id = @place_id_antigo;

update [delivery_prospect].[dbo].[place] set place_id = @place_id_novo where place_id = @place_id_antigo;
update [delivery_prospect].[dbo].[place] set id = @place_id_novo where id = @place_id_antigo;
GO
/****** Object:  StoredProcedure [dbo].[busca_filial_proxima]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[busca_filial_proxima]
(
	@lat decimal(20,12),
	@lng decimal(20,12),
	@place_id bigint
)
as 
SELECT [id]
      ,[matriz_id]
      ,[nome]
      ,[lat]
      ,[lng]
      ,[endereco]
      ,[numero]
      ,[complemento]
      ,[cidade]
      ,[administrador_id]
      ,[telefone]
      ,[celular]
      ,[logo]
      ,[background]
      ,[pais]
      ,[logo_itype]
      ,[background_itype]
      ,[distancia]
	  ,[dbo].[GetDistanceBetween] (@lat, @lng, lat, lng) as real_distance
  FROM [dbo].[filial]
  where 
  ([dbo].[GetDistanceBetween] (@lat, @lng, lat, lng) <= 90000) and 
  lat is not null and lng is not null and place_id = @place_id
GO
/****** Object:  StoredProcedure [dbo].[buscar_cascata_produto]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--  [buscar_cascata_produto] 184,47,1512651845703501

CREATE procedure [dbo].[buscar_cascata_produto]
(
@tipo_id int = null,
@filial_id int = null,
@place_id bigint = null
)
as
select 

p.id as 'produto_id',
p.nome as 'produto_nome',
(CASE WHEN p.icone_itype is null then
''
else
'/api/produto?produto_id='+ CONVERT(varchar(10), p.id)
END) as icone,
p.preco as 'produto_preco',
p.descricao as 'produto_descricao',
p.observacao as 'produto_observacao',
p.estoque as 'produto_estoque',
p.duracao as 'produto_duracao',
p.destaque as 'produto_destaque',
p.administrador_id as 'produto_administrador_id',
p.agenda_id as 'agenda_id',
p.external_id as 'produto.external_id',  
(p.avaliacao / p.avaliacao_quantidade) as 'produto_estrela',
m.id as 'montagem_id',
m.nome as 'montagem_nome',
m.ordem as 'montagem_ordem',
m.preco as 'montagem_preco',
m.max as 'montagem_max',
m.min as 'montagem_min',
c.id as 'complemento_id',
cp.preco as 'complemento_preco',
cp.id as 'complemento_product_id',
cp.external_id as 'complemento_external_id',
cp.id as 'complemento_produto_id',
cp.nome as 'complemento_nome',
cp.preco as 'complemento_produto_preco',
(CASE WHEN cp.icone_itype is null then
''
else
'/api/produto?produto_id='+ CONVERT(varchar(10), cp.id)
END) as 'complemento_icone',
cp.estoque as 'complemento_estoque',
cp.descricao as 'complemento_descricao'

from produto p 
left join filial_produto fp on fp.produto_id = p.id
left join montagem m on m.produto_id = p.id
left join complemento c on c.montagem_id = m.id
left join produto cp on cp.id = c.product_id

where 
p.buscavel = 1 and (p.[status] = 1 or p.[status] is null) and
(@tipo_id is null or p.tipo_id = @tipo_id) 
and
(fp.filial_id is null or fp.filial_id = @filial_id) and 
p.place_id=@place_id

order by p.destaque, m.ordem, cp.preco desc

 


GO
/****** Object:  StoredProcedure [dbo].[clear_altec]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--     [clear_altec] 253400021958443
CREATE procedure [dbo].[clear_altec]
(
	@place_id bigint
)
as


delete FROM [delivery].[dbo].[complemento] where place_id = @place_id
delete FROM [delivery].[dbo].[pedido] where place_id = @place_id
delete FROM [delivery].[dbo].[montagem] where place_id = @place_id
delete FROM [delivery].[dbo].[filial_produto]
delete FROM [delivery].[dbo].[produto] where place_id = @place_id
delete FROM [delivery].[dbo].[tipo] where place_id = @place_id
GO
/****** Object:  StoredProcedure [dbo].[criar_aplicativo]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
[criar_aplicativo] 519831981416181
*/
CREATE procedure [dbo].[criar_aplicativo] 
(
	@place_id bigint
)
as
if NOT EXISTS(select 1 from filial where PLACE_ID = @place_id)
BEGIN
	declare @nome_pessoa varchar(250) = null
	declare @email_pessoa varchar(250) = null
	declare @password varchar(250) = null
	declare @mobile varchar(250) = null
	declare @nome_filial varchar(250) = null
	declare @lat decimal(20,12) = null
	declare @lng decimal(20,12) = null
	declare @street varchar(8000) = null
	declare @city varchar(8000) = null
	declare @country varchar(8000) = null
	declare @place_id_template bigint = null

	select 
	@nome_filial = p.[name],
	@nome_pessoa = p.[user_name], 
	@email_pessoa = e.email, 
	@mobile = p.phone, 
	@password = p.[password], 
	@lat = l.latitude, 
	@lng = l.longitude,
	@street = l.street,
	@city = l.city,
	@country = l.country
	from [delivery_prospect].[dbo].[place] p
	inner join [delivery_prospect].[dbo].[email] e on e.data_id = p.id
	left join [delivery_prospect].[dbo].[location] l on l.id = p.location_id
	where p.id = @place_id
	
	INSERT INTO pessoa ([nome],[email],[perfil_id],[mobile],[password],[active],[place_id]) VALUES
	(@nome_pessoa,@email_pessoa,4,@mobile,@password ,'true',@place_id)

	declare @administrador_id int = @@identity

	INSERT INTO filial
	([delivery],[telefone], [celular],[nome] ,[lat],[lng],[endereco],[numero] ,[complemento] ,[cidade] ,[administrador_id] ,[pais],[distancia],[place_id],
	[entraga_valor_km],
	[entrega_distancia_gratis],
	[entrega_distancia_maxima]) VALUES
	(1, @mobile,@mobile,@nome_filial,@lat, @lng,@street,'' ,'' ,@city ,@administrador_id ,@country,3 ,@place_id,
	0.2,
	1,
	8
	);
	
	declare @filial_id int = @@identity

	INSERT INTO acesso ([create] ,[edit] ,[delete] ,[list] ,[perfil_id] ,[url] ,[name] ,[icon],[order],[group],[place_id]) VALUES 
	(1,1,1,1,4,'/pessoas?perfil_id=2','Clientes','fa fa-user-circle-o',1,'Usuários',@place_id),
	(1,1,1,1,4,'/pessoas?perfil_id=4','Gerentes','fa fa-black-tie',2,'Usuários',@place_id),
	(1,1,1,1,4,'/compras','Compras','fa fa-shopping-cart',3,null,@place_id),
	(1,1,1,1,4,'/estoques','Estoques','fa fa-cubes',4,null,@place_id),
	(1,1,1,1,4,'/filiais','Filiais','fa fa-building',5,null,@place_id),
	(1,1,1,1,4,'/tipos','Categorias','fa fa-tag',6,null,@place_id),
	(1,1,1,1,4,'/compras/details','Dashboard','fa fa-calendar',7,null,@place_id)
	
	INSERT INTO grupo_do_pagamento ([nome] ,[place_id]) VALUES ('Pague Online',@place_id)
	
	declare @pague_online int = @@identity

	INSERT INTO grupo_do_pagamento ([nome] ,[place_id]) VALUES ('Pague na Entrega',@place_id)
	
	declare @pague_na_entrega int = @@identity

	INSERT INTO pagamento ([nome] ,[taxa] ,[grupo_do_pagamento_id] ,[bandeira_id] ,[place_id], transacao) VALUES
	('Dinheiro',null,@pague_na_entrega,null,@place_id, 1),
	('Cartão de Crédito',2,@pague_na_entrega,null,@place_id,2),
	('Cartão de Débito',0,@pague_na_entrega,null,@place_id,3),
	('Vale Refeição',0,@pague_na_entrega,null,@place_id,5)

	

	INSERT INTO pagamento ([nome] ,[taxa] ,[grupo_do_pagamento_id] ,[bandeira_id] ,[place_id], transacao) VALUES
	('Cartão de Crédito',2,@pague_online,null,@place_id,4)

	select @filial_id as 'filial_id'
END
GO
/****** Object:  StoredProcedure [dbo].[fila_de_entrega]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[fila_de_entrega]
(
	@place_id bigint
)
as
SELECT [dbo].[GetDistanceBetween] (h.lat, h.lng, h1.lat, h1.lng) as 'distancia'
,c.id
	  ,c.recebido
	  ,h.endereco
	  ,h.numero
	  ,h.complemento
      ,h.cidade
      ,h.cep
	  ,(select count(1) from pedido where compra_id = c.id) 'quantidade'
  FROM [dbo].[horario] h
  cross join [dbo].[horario] h1 
  inner join compra c on c.id = h.compra_id
  where h.lat is not null and h1.lat is not null
  and [dbo].[GetDistanceBetween] (h.lat, h.lng, h1.lat, h1.lng) != 0 and h.place_id = @place_id
  group by [dbo].[GetDistanceBetween] (h.lat, h.lng, h1.lat, h1.lng)
	  ,c.id
	  ,c.recebido
	  ,h.endereco
	  ,h.numero
	  ,h.complemento
      ,h.cidade
      ,h.cep
  order by [dbo].[GetDistanceBetween] (h.lat, h.lng, h1.lat, h1.lng)
GO
/****** Object:  StoredProcedure [dbo].[FindEstoque]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FindEstoque]
(@vendedor_id int,
@data_entrada datetime,
@data2 datetime,
@lote bigint,
@place_id bigint

)

as


select p.nome as 'Nome Vendedor' ,min(e.data_entrada) as 'Data Entrada',sum(e.estoque) as 'Estoque',e.lote as 'Lote'
from estoque e
inner join pessoa p on p.id = e.pessoa_id
where e.place_id = @place_id and
(@vendedor_id is null or e.pessoa_id = @vendedor_id ) and
(@data_entrada is null or data_entrada between @data_entrada and @data2) and
(@lote is null or e.lote = @lote )

 group by p.nome,e.lote 
GO
/****** Object:  StoredProcedure [dbo].[trigger_place_id]    Script Date: 26/09/2018 07:50:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[trigger_place_id]
as
SELECT 'CREATE TRIGGER ' + QUOTENAME('trg_' + name) + '
ON ' + QUOTENAME(name) + '
FOR INSERT, UPDATE, DELETE
AS
	if exists(SELECT * from inserted) and exists (SELECT * from deleted)
begin
	update filial
	set versao = ISNULL(versao,0)+1
	where place_id = (SELECT top 1 place_id FROM inserted)
end

If exists (Select * from inserted) and not exists(Select * from deleted)
begin
	update filial
	set versao = ISNULL(versao,0)+1
	where place_id = (SELECT top 1 place_id FROM inserted)
end

If exists(select * from deleted) and not exists(Select * from inserted)
begin
	update filial
	set versao = ISNULL(versao,0)+1
	where place_id = (SELECT top 1 place_id FROM deleted)
end
'
FROM dbo.sysobjects 
WHERE 
xtype = 'U' and 
name in ('filial','tipo','produto','montagem', 'complemento','grupo_do_pagamento', 'agenda', 'pagamento')
GO
