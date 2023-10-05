using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using MySql.Data.MySqlClient;

[Route("api/[controller]")]
[ApiController]

public class EmailController
{
        sendEmail static void (string emailto,string emailfrom,string subject,string message){
            var email = new MimeMessage();

            email.To.Add(new MailboxAddress("gh", emailto));
            email.From.Add(new MailboxAddress("pl", emailfrom));

            email.Subject = subject;

            email.Body = new TextPart ("plain") {
                Text = @"Hey Alice,

            What are you up to this weekend? Monica is throwing one of her parties on
            Saturday and I was hoping you could make it.

            Will you be my +1?

            -- Joey
            "
            };
            
            using (var smtp = new SmtpClient())
            {
                smtp.Connect("sandbox.smtp.mailtrap.io", 587, false);

                // Note: only needed if the SMTP server requires authentication
                smtp.Authenticate("77b76d7fbd0872", "3c1a8b0619bbf2");

                smtp.Send(email);
                smtp.Disconnect(true);
            }
        }

    [HttpPost]
    public IActionResult UserId([FromBody] Email email)
    {
            // Handle the incoming data and perform user registration logic here.
            // The [FromBody] attribute tells ASP.NET to deserialize the JSON or XML request body into the `signupData` parameter.

            try
            {

                sendEmail(email.emailto,email.emailfrom,email.subject,email.message);
                return Ok(new { Message = "Email Sent"});
            }
            catch (Exception ex)
            {
                // Handle any exceptions or errors that occur during registration.
                return BadRequest(new { Message = "Error adding", Error = ex.Message });
            }
    }

}

 public class Email{
        public string emailto {get;set;}
        public string emailfrom {get;set;}
        public string subject {get;set;}
        public string message {get;set;}
    }

