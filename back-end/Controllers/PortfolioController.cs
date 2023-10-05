using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
public class PortfolioController : ControllerBase
{
    private static readonly List<Portfolio> Portfolios = GetAll();

    public static List<Portfolio> GetAll(){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                List<Portfolio> port = new List<Portfolio>();
                string sqlQ = "Select * from Portfolios";

                using (MySqlCommand command =  new MySqlCommand(sqlQ,sqlconnection)){

                    using (MySqlDataReader reader = command.ExecuteReader()){

                        while(reader.Read()){
                            Console.WriteLine(1);
                            port.Add(new Portfolio{
                                PortfolioId = reader.GetInt32("portfolio_id"),
                                UserId = reader.GetInt32("user_id"),
                                StockId = reader.GetInt32("stock_id"),
                                PortfolioName = reader.GetString("portofolio_name")
                            });
                        }
                    }
                }

                return port;
            }
            catch (Exception e){
                return Portfolios;
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(GetAll());
    }

    public static void InsertIntoPortfolio(int UserId, int StockId, string PortfolioName){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=MyPassword1234";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                string sqlQuery = $"Insert into Portfolios (user_id,stock_id,portofolio_name) values ({UserId},{StockId},'{PortfolioName}' )" ;
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
        public IActionResult CreatePortfolio([FromBody] NewPortfolioRequest newPortfolioData)
        {
            // Handle the incoming data and perform user registration logic here.
            // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

            try
            {
                InsertIntoPortfolio(newPortfolioData.UserId, newPortfolioData.StockId, newPortfolioData.PortfolioName);
                return Ok(new { Message = "Portfolio created successfully." });
            }
            catch (Exception ex)
            {
                // Handle any exceptions or errors that occur during registration.
                return BadRequest(new { Message = "Error creating portfolio.", Error = ex.Message });
            }
        }


    public class Portfolio
    {
        public int PortfolioId { get; set; }
        public int UserId {get; set;}
        public int StockId { get; set; }
        public string PortfolioName { get; set; }
    }

    public class NewPortfolioRequest
    {
        public int UserId {get; set;}
        public int StockId { get; set; }
        public string PortfolioName { get; set; }
        // Add other properties as needed
    }

   
}