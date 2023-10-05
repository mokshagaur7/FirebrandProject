using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]

public class StockController : ControllerBase
{
    private static readonly List<Stock> PortfolioStocks = GetAll();

    public static List<Stock> GetAll(){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=Chitarra23?";
            using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr))
            {
                try
                {
                    sqlconnection.Open();
                    
                    List<Stock> PortfolioStocks = new List<Stock>();
                    string sqlQ = "Select * from Stocks";

                    using (MySqlCommand command =  new MySqlCommand(sqlQ,sqlconnection)){

                        using (MySqlDataReader reader = command.ExecuteReader()){

                            while(reader.Read()){
                                PortfolioStocks.Add(new Stock{
                                    StockId = reader.GetInt32("stock_id"),
                                    Symbol = reader.GetString("symbol"),
                                    Name = reader.GetString("name"),
                                    PortfolioId = reader.GetInt32("portfolio_id"),
                                });
                            }
                        }
                    }

                    return PortfolioStocks;
                }
                catch (Exception e){
                    return PortfolioStocks;
                    Console.WriteLine($"Error: {e.Message}");
                }
            }
    }

    [HttpGet]
public IActionResult Get([FromQuery] int? portfolioId)
{
    if (portfolioId == null)
    {
        // If portfolioId is not provided, return all stocks
        return Ok(PortfolioStocks);
    }
    else
    {
        // Filter stocks based on the provided portfolioId
        var stocksForPortfolio = PortfolioStocks.Where(stock => stock.PortfolioId == portfolioId).ToList();
        return Ok(stocksForPortfolio);
    }
}

    public static void InsertIntoStocks(string Symbol, string Name, int PortfolioId){
        string connectionStr = "server=127.0.0.1;database=StockPortfolioDB;user=root;password=Chitarra23?";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                string sqlQuery = $"INSERT INTO Stocks (symbol, name, portfolio_id) VALUES ('{Symbol}', '{Name}', {PortfolioId});" ;
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
    public IActionResult AddStockToPortfolio([FromBody] Stock newPortfolioStockData)
    {
        // Handle the incoming data and perform user registration logic here.
        // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

        try
        {
            InsertIntoStocks(newPortfolioStockData.Symbol, newPortfolioStockData.Name, newPortfolioStockData.PortfolioId);
            return Ok(new { Message = "Portfolio created successfully." });
        }
        catch (Exception ex)
        {
            // Handle any exceptions or errors that occur during registration.
            return BadRequest(new { Message = "Error creating portfolio.", Error = ex.Message });
        }
    }

    public class Stock
    {
        public int StockId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public int PortfolioId { get; set; }
    }
}