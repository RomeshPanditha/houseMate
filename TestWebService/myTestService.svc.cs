using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data.Entity;

namespace TestWebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "myTestService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select myTestService.svc or myTestService.svc.cs at the Solution Explorer and start debugging.
    public class myTestService : ImyTestService
    {
        public BL.DogKeeper keeper = new BL.DogKeeper();
        

        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getMessage")]
        public string getMessage()
        {
         
                string result = "houses: ";

                MyHouseMateEntities hm = new MyHouseMateEntities();
                List<house> houseL = hm.houses.ToList<house>();
                foreach (house h in houseL)
                {
                    result += "   " + h.houseName.ToString();
                    
                }
                

                return result;

                
                
            
           
                
        }

        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getMessageTwo")]
        public string getMessageTwo()
        {
            try
            {
                string result = "something else";
                string conStr = @"server=houseMate.db.12005856.hostedresource.com; Uid=houseMate;database=houseMate; Pwd= M!cr0s0ft";
                MySqlConnection conn = new MySqlConnection(conStr);
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT houseName FROM house WHERE PK_houseId = 2";

                conn.Open();


                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    result = reader.GetString(reader.GetOrdinal("houseName"));
                }

                return result;



            }
            catch
            {
                return "error retrieving data";
            }
        }

        
        private void addSomeDogs()
        {
            keeper.addDog("russ", "jack russel", "3");
            keeper.addDog("bingo", "pomeranian", "1");
            keeper.addDog("porsha", "labradore", "6");
            keeper.addDog("jatzy", "jack russel", "1");
        }

        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetPeople")]
        public Person[] GetPeople()
        {
            return PeopleRepository.People.ToArray();
        }


        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "SavePerson?name={name}")]
        public Person[] SavePerson(string name)
        {
            var person = new Person { name = name};
            PeopleRepository.People.Add(person);

            return PeopleRepository.People.ToArray();
        }

        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getDogs")]
        public DogData[] getDogs()
        {
            List<Model.Dog> dogList = keeper.getDogs();
            List<DogData> dogData = new List<DogData>();
            foreach(Model.Dog dog in dogList)
            {
                dogData.Add(new DogData {dogName = dog.name, dogBreed = dog.breed, dogAge = dog.age.ToString() });
            }

            return dogData.ToArray();
        }

        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "addDog?dogName={dogName}&dogBreed={dogBreed}&dogAge={dogAge}")]
        public DogData[] addDog(string dogName, string dogBreed, string dogAge)
        {
            keeper.addDog(dogName, dogBreed, dogAge);

            List<Model.Dog> dogList = keeper.getDogs();
            List<DogData> dogData = new List<DogData>();
            foreach (Model.Dog dog in dogList)
            {
                dogData.Add(new DogData { dogName = dog.name, dogBreed = dog.breed, dogAge = dog.age.ToString() });
            }

            return dogData.ToArray();
        }
    }

    public static class PeopleRepository
    {
        public static List<Person> People = new List<Person>()
        {
            new Person {name = "john" },
            new Person {name = "sally"},
            new Person {name = "lynda"},
            new Person {name = "tom"}

        };
    }
}
