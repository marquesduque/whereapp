
SELECT 'insert into [sql_nome_estabelecimento].[dbo].['+table_name+'] select * from [delivery].[dbo].['+ table_name+'] GO' FROM INFORMATION_SCHEMA.TABLES 