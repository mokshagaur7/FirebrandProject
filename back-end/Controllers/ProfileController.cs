using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
    public class ProfileController : ControllerBase
    {
       
        public static void UserProfile(string username,string email){
            string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
            using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
                try
                {
                    sqlconnection.Open();
                    string sqlQuery = $"Update Users Set email = '{email}' WHERE username = '{username}'" ;
                    using (MySqlCommand cmd = new MySqlCommand(sqlQuery,sqlconnection)){ 
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception e){
                    Console.WriteLine($"Error: {e.Message}");
                }
            }
        }

        [HttpPost]
        public IActionResult RegisterUser([FromBody] User user)
        {
                // Handle the incoming data and perform user registration logic here.
                // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

                try
                {
                    UserProfile(user.Username,user.Email);
                    return Ok(new { Message = "User registered successfully." });
                }
                catch (Exception ex)
                {
                    // Handle any exceptions or errors that occur during registration.
                    return BadRequest(new { Message = "Error registering user.", Error = ex.Message });
                }
        }


        public class User
        {
            //public int? Id { get; set; }
            public string? Username { get; set; }
            //public string? Password { get; set; }
            //public string? PortfolioIds { get; set; }
            public string? Email  {get;set;}
        }
        
    }
