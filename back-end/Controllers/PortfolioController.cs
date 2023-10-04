using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class PortfolioController : ControllerBase
{
    private static readonly List<Portfolio> portfolios = new List<Portfolio>
    {
        new Portfolio { Id = 1, Name = "EVs", StockIds = new int[] {1} },
        new Portfolio { Id = 2, Name = "American stocks", StockIds = new int[] {2} },
        new Portfolio { Id = 3, Name = "European stocks", StockIds = new int[] {1, 2}},
        new Portfolio { Id = 4, Name = "Chinese stocks", StockIds = new int[] {1, 2, 3}}
    };

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(portfolios);
    }

    public class Portfolio
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int[]? StockIds { get; set; }
    }
}