using System;
using MySql.Data.MySqlClient;

public class Program{

    static void Main(string[] args){
        string connectionStr = "server=127.0.0.1;database=College;user=root;password=MyPassword1234";
        using(MySqlConnection sqlconnection = new MySqlConnection(connectionStr)){
            try
            {
                sqlconnection.Open();
                Console.WriteLine("Pick an ID: ");
                string id = (Console.ReadLine());
                string sqlQuery = "Select * from Students where PersonID = @id" ;

                using (MySqlCommand command =  new MySqlCommand(sqlQuery,sqlconnection)){
                    command.Parameters.AddWithValue("@id",id);
                    using (MySqlDataReader reader = command.ExecuteReader()){
                        while(reader.Read()){
                            int PersonID = reader.GetInt32("PersonID");
                            string LastName = reader.GetString("LastName");
                            string FirstName = reader.GetString("FirstName");
                            string city = reader.GetString("City");

                            Console.WriteLine($"ID:{PersonID},Name: {FirstName},{city},{LastName}");
                        }
                    }
                }
            }
            
            catch (Exception e)
            {
                
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }
}