using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
public class SignupController : ControllerBase
{
    private static readonly List<User> users = new List<User>
    {
        new User { Id = 1, Username = "EVs", Password = "password", PortfolioIds = new int[] {1}, Email = "anything" }
    };
    
    // public static void InsertIntoUsers(int user_id,string name,string password,string portfolio,string email){
    //     string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
    //     using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
    //         try
    //         {
    //             sqlconnection.Open();
    //             string sqlQuery = $"Insert into Users values ({user_id},'{name}','{password}','{portfolio}','{email}')" ;
    //             using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
    //                 cmd.ExecuteNonQuery();
    //             }
    //         }
    //         catch (Exception e){
    //             Console.WriteLine($"Error: {e.Message}");
    //         }
    //     }
    // }

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

    // public static void GetAll(MySqlConnection sqlconnection){
    //     string sqlQ = "Select * from Users";

    //     using (MySqlCommand command =  new MySqlCommand(sqlQ,sqlconnection)){
    //         using (MySqlDataReader reader = command.ExecuteReader()){
    //             while(reader.Read()){
    //                 int PersonID = reader.GetInt32("user_id");
    //                 string LastName = reader.GetString("username");
    //                 string FirstName = reader.GetString("password");
    //                 string city = reader.GetString("portfolioID");

    //                 Console.WriteLine($"ID:{PersonID},Name: {FirstName},{city},{LastName}");
    //             }
    //         }
    //     }
    // }

    
    [HttpGet]
    public IActionResult Get()
   {
        return Ok(users);
   }

   [HttpPost]
    public IActionResult Post([FromBody] SignupRequest signupRequest)
    {
        // Implement the logic to process the signupRequest data
        // For example, you can add the user to your list of users
        // and return a success response.
        users.Add(new User
        {
            Id = 6, // You may need to generate unique IDs
            Username = signupRequest.Username,
            Password = signupRequest.Password,
            Email = signupRequest.Email
            // Assign other properties as needed
        });

        return Ok("User registered successfully");
    }

   public class User
    {
        public int? Id { get; set; }
        public string? Username { get; set; }
         public string? Password { get; set; }
        public int[]? PortfolioIds { get; set; }
        public string? Email  {get;set;}
    }

    public class SignupRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        // Add other properties as needed
    }

}

