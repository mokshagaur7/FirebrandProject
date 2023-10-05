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
