using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
public class IdController : ControllerBase
{

    public int UseraId;  

     [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { Message = "UserdId caught."+UseraId});
    }

    public static void UserProfile(int id){
            string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
            using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
                try
                {
                    sqlconnection.Open();
                    string sqlQuery = $"Update Ids Set Id = '{email}' WHERE username = '{username}'" ;
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
    public IActionResult UserId([FromBody] UsersId userId)
    {
            // Handle the incoming data and perform user registration logic here.
            // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

            try
            {

                this.UseraId = userId.UserrrrId;
                return Ok(new { Message = "UserdId caught."+UseraId});
            }
            catch (Exception ex)
            {
                // Handle any exceptions or errors that occur during registration.
                return BadRequest(new { Message = "Error adding", Error = ex.Message });
            }
    }

     public class UsersId{
        public int UserrrrId {get;set;}
    }

}
