using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
public class SignupController : ControllerBase
{
    public static void InsertIntoUsers(int user_id,string name,string password,string portfolio,string email){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                string sqlQuery = $"Insert into Users values ({user_id},'{name}','{password}','{portfolio}','{email}')" ;
                using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception e){
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }

     public static void InsertIntoStocks(int stock_id,string symbol,string name,MySqlConnection sqlconnection){
       string sqlQuery = $"Insert into Stocks values ({stock_id},'{symbol}','{name}')" ;
        using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
            cmd.ExecuteNonQuery();
        }
    }

     public static void InsertIntoPortfolio(int portfolio_id,int user_id,int stock_id,string name,MySqlConnection sqlconnection){
        string sqlQuery = $"Insert into Portfolios values ({portfolio_id},{user_id},{stock_id},'{name}')" ;
        using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
            cmd.ExecuteNonQuery();
        }
    }

    public static void GetAll(MySqlConnection sqlconnection){
        string sqlQ = "Select * from Users";

        using (MySqlCommand command =  new MySqlCommand(sqlQ,sqlconnection)){
            using (MySqlDataReader reader = command.ExecuteReader()){
                while(reader.Read()){
                    int PersonID = reader.GetInt32("user_id");
                    string LastName = reader.GetString("username");
                    string FirstName = reader.GetString("password");
                    string city = reader.GetString("portfolioID");

                    Console.WriteLine($"ID:{PersonID},Name: {FirstName},{city},{LastName}");
                }
            }
        }
    }

    
    //[HttpGet]
    //public IActionResult Get()
   // {
        //return Ok();
   // }

}

   public class User
    {
        public int? Id { get; set; }
        public string? username { get; set; }
         public string? password { get; set; }
        public int? PortfolioIds { get; set; }
        public string? email  {get;set;}
    }