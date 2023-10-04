using System;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace TestClient {
  class Program
  {
    public static void Main (string[] args)
    {
      var email = new MimeMessage();

      email.To.Add(new MailboxAddress("gh", "vabbit81@gmail.com"));
      email.From.Add(new MailboxAddress("pl", "polironald@yahoo.com"));

      email.Subject = "Testingasasasa out email sending";
    
      using (var smtp = new SmtpClient())
      {
        smtp.Connect("sandbox.smtp.mailtrap.io", 587, false);

        // Note: only needed if the SMTP server requires authentication
        smtp.Authenticate("77b76d7fbd0872", "3c1a8b0619bbf2");

        smtp.Send(email);
        smtp.Disconnect(true);
      }
    }
  }
}