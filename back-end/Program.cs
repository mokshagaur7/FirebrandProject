using Microsoft.AspNetCore.Builder;

using Microsoft.AspNetCore.Hosting;

using Microsoft.Extensions.Configuration;

using Microsoft.Extensions.DependencyInjection;

using Microsoft.Extensions.Logging;

 

public class Program

{

    public static void Main(string[] args)

    {

        var builder = WebApplication.CreateBuilder(args);

 

        // Add services to the container.

        builder.Services.AddControllers();

 

        // Enable CORS.

        builder.Services.AddCors(options =>

        {

            options.AddPolicy("default", policy =>

            {

                policy.AllowAnyOrigin();

                policy.AllowAnyMethod();

                policy.AllowAnyHeader();

            });

        });

 

        var app = builder.Build();

 

        // Configure the HTTP pipeline.

        if (app.Environment.IsDevelopment())

        {

            app.UseDeveloperExceptionPage();

        }

 

        app.UseRouting();

        app.UseCors("default");

        app.UseAuthorization();

 

        app.UseEndpoints(endpoints =>

        {

            endpoints.MapControllers();

        });

 

        app.Run();

    }

}