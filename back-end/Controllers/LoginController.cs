using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
    public class LoginController : ControllerBase
    {
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
                                userlist.Add(new User{
                                    Id = reader.GetInt32("user_id"),
                                    Username = reader.GetString("username"),
                                    Password = reader.GetString("password"),
                                    PortfolioIds = reader.GetString("portfolioID"),
                                    Email = reader.GetString("email")
                                });

                                
                            }

                        }
                    }

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
                    return Ok(GetAll());
                }
                catch (Exception ex)
                {
                    // Handle any exceptions or errors that occur during registration.
                    return BadRequest(new { Message = "Error registering user.", Error = ex.Message });
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
        
    }
