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
    public IActionResult Get()
    {
        return Ok(PortfolioStocks);
    }

    public class Stock
    {
        public int StockId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public int PortfolioId { get; set; }
    }
}