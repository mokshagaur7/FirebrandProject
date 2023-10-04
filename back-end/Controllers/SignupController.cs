using System;
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

    //  public static void InsertIntoStocks(int stock_id,string symbol,string name,MySqlConnection sqlconnection){
    //    string sqlQuery = $"Insert into Stocks values ({stock_id},'{symbol}','{name}')" ;
    //     using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
    //         cmd.ExecuteNonQuery();
    //     }
    // }

    //  public static void InsertIntoPortfolio(int portfolio_id,int user_id,int stock_id,string name,MySqlConnection sqlconnection){
    //     string sqlQuery = $"Insert into Portfolios values ({portfolio_id},{user_id},{stock_id},'{name}')" ;
    //     using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
    //         cmd.ExecuteNonQuery();
    //     }
    // }

    public static List<User> GetAll(){
         string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                List<User> userlist = new List<User>();
                string sqlQ = "Select * from Users";

                using (MySqlCommand command =  new MySqlCommand(sqlQ,sqlconnection)){
                    using (MySqlDataReader reader = command.ExecuteReader()){
                        while(reader.Read()){
                            userlist.Add(new User(){
                                Id = reader.GetInt32("user_id"),
                                Username = reader.GetString("username"),
                                Password = reader.GetString("password"),
                                PortfolioIds = reader.GetString("portfolioID"),
                                Email = reader.GetString("email")
                            });
                        }
                    }
                }
                Console.WriteLine(userlist);
                return userlist;
            }
            catch (Exception e){
                return portfolios;
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }

    private static readonly List<User> portfolios = GetAll();
    
    [HttpGet]
    public IActionResult Get()
    {
        try
            {
                return Ok(portfolios);
            }
            catch (Exception ex)
            {
                // Handle any exceptions or errors that occur during registration.
                return BadRequest(new { Message = "Error registering user.", Error = ex.Message });
            }
    }


    [HttpPost]
    public IActionResult RegisterUser([FromBody] SignupRequest signupData)
    {
            // Handle the incoming data and perform user registration logic here.
            // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

            try
            {
                InsertIntoUsers(9,signupData.Username,signupData.Password,"2",signupData.Email);
                return Ok(new { Message = "User registered successfully." });
            }
            catch (Exception ex)
            {
                // Handle any exceptions or errors that occur during registration.
                return BadRequest(new { Message = "Error registering user.", Error = ex.Message });
            }
    }
}

   public class User
    {
        public int? Id { get; set; }
        public string? Username { get; set; }
         public string? Password { get; set; }
        public string? PortfolioIds { get; set; }
        public string? Email  {get;set;}
    }

    public class SignupRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        // Add other properties as needed
    }



