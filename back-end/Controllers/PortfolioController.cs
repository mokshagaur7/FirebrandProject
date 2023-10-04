using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]
public class PortfolioController : ControllerBase
{
    private static readonly List<Portfolio> Portfolios = new List<Portfolio>
    {
        new Portfolio { PortfolioId = 1, UserId = 1, StockId = 0, PortfolioName = "EVs" },
        new Portfolio { PortfolioId = 2, UserId = 1, StockId = 1, PortfolioName = "American stocks"},
        new Portfolio { PortfolioId = 3, UserId = 1, StockId = 2, PortfolioName = "European stocks"},
        new Portfolio { PortfolioId = 4, UserId = 1, StockId = 3, PortfolioName = "Chinese stocks"}
    };

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Portfolios);
    }

    public static void InsertIntoPortfolio(int PortfolioId, int UserId, int StockId, string PortfolioName){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=Chitarra23?";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                string sqlQuery = $"Insert into Portfolios values ({PortfolioId},{UserId},{StockId},'{PortfolioName}' )" ;
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
                InsertIntoPortfolio(newPortfolioData.PortfolioId, newPortfolioData.UserId, newPortfolioData.StockId, newPortfolioData.PortfolioName);
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
        public int PortfolioId { get; set; }
        public int UserId {get; set;}
        public int StockId { get; set; }
        public string PortfolioName { get; set; }
        // Add other properties as needed
    }
}