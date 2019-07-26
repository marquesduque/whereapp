
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using api.Models;


class god
{
    public void create(string nome)
    {
        execute("master", @"CREATE DATABASE " + nome + " ON PRIMARY  (NAME = " + nome + @",  FILENAME = 'D:\RDSDBDATA\DATA\" + nome + @".mdf',  SIZE = 4MB,	FILEGROWTH =10%)  LOG ON (NAME =nome_Log,  FILENAME = 'D:\RDSDBDATA\DATA\" + nome + "_log.ldf',  SIZE = 4MB, 	FILEGROWTH =10%)  ");


        List<string> arr = new List<string>();
        arr.Add("GO");


        string[] script = System.IO.File.ReadAllText(@"C:\Users\Fernando\source\repos\MyFirstProject\AppDelivery\api\api\SqlServer\script.sql").Replace("sql_nome_estabelecimento", nome).Split(arr.ToArray(), StringSplitOptions.RemoveEmptyEntries);

        bool constraint = false;
        foreach (var s in script)
        {
            if (!constraint && s.ToLower().Contains("WITH CHECK ADD  CONSTRAINT".ToLower()))
            {
                constraint = true;
                var tabelas = reader(nome, "SELECT table_name as description FROM INFORMATION_SCHEMA.TABLES ");

                foreach (string tabela in tabelas)
                {
                    execute(nome, "SET IDENTITY_INSERT " + tabela + " ON");

                }
                foreach (string tabela in tabelas)
                {
                    var columns = reader(nome, "SELECT Column_name as description FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + tabela + "'");
                    string strcolumns = "";
                    foreach (var column in columns)
                    {
                        strcolumns += ",[" + column + "]";
                    }
                    strcolumns = strcolumns.Substring(1);
                    //execute(nome, "SET IDENTITY_INSERT " + tabela + " ON");
                    execute(nome, "SET IDENTITY_INSERT " + tabela + " ON insert into [" + nome + "].[dbo].[" + tabela + "](" + strcolumns + ") select " + strcolumns + " from [delivery].[dbo].[" + tabela + "] SET IDENTITY_INSERT " + tabela + " OFF ");
                    //execute(nome, "SET IDENTITY_INSERT " + tabela + " OFF");
                    //execute(nome, "ALTER TABLE " + tabela + " DROP CONSTRAINT PK_" + tabela + "");
                    //execute(nome, "ALTER TABLE " + tabela + " DROP COLUMN[id]");
                    //execute(nome, "ALTER TABLE " + tabela + " ADD[id][int] IDENTITY(1, 1) NOT NULL");
                    //execute(nome, "ALTER TABLE " + tabela + " ADD primary key(id)");
                }
                foreach (string tabela in tabelas)
                {
                    execute(nome, "SET IDENTITY_INSERT " + tabela + " OFF");

                }

            }

            execute(nome, s);

        }


        return;
    }
    public void execute(string database, string sqlCreateDBQuery)
    {
        System.Data.SqlClient.SqlConnection tmpConn;
        tmpConn = new SqlConnection();
        tmpConn.ConnectionString = "SERVER = leica.cx58noomsqom.us-east-1.rds.amazonaws.com,1433; DATABASE = "+ database + "; User ID = ghop; Pwd = Nv072arnat";

        SqlCommand myCommand = new SqlCommand(sqlCreateDBQuery, tmpConn);
        try
        {
            tmpConn.Open();
            myCommand.ExecuteNonQuery();

        }
        catch (System.Exception ex)
        {

        }
        finally
        {
            tmpConn.Close();
        }
        return;
    }
    public List<string> reader(string database, string sqlCreateDBQuery)
    {
        System.Data.SqlClient.SqlConnection tmpConn;
        tmpConn = new SqlConnection();
        tmpConn.ConnectionString = "SERVER = ghop.cx58noomsqom.us-east-1.rds.amazonaws.com,1433; DATABASE = "+ database + "; User ID = ghop; Pwd = Nv072arnat";

        SqlCommand myCommand = new SqlCommand(sqlCreateDBQuery, tmpConn);
        try
        {
            SqlDataReader myReader = null;
            tmpConn.Open();
            myReader = myCommand.ExecuteReader();
            List<string> results = new List<string>();
            while (myReader.Read())
            {
                results.Add(myReader["description"].ToString());
            }

            return results;

        }
        catch (System.Exception ex)
        {

        }
        finally
        {
            tmpConn.Close();
        }
        return new List<string>();
    }
}



