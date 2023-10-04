using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class PortfolioController : ControllerBase
{
    private static readonly List<Portfolio> portfolios = new List<Portfolio>
    {
        new Portfolio { Id = 1, Name = "EVs" },
        new Portfolio { Id = 2, Name = "American stocks" },
        new Portfolio { Id = 3, Name = "European stocks"}
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
    }
}