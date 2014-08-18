using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestWebService.Model;

namespace TestWebService.BL
{
    public class DogKeeper
    {
        public string message = "This is a message from the BL";

        private List<Dog> dogList = new List<Dog>();

        public List<Dog> addDog(string dogName, string dogBreed, string dogAge)
        {
            Dog newDog = new Dog(dogName, dogBreed, dogAge);
            
            dogList.Add(newDog);
            return dogList;
        }

        public List<Dog> getDogs()
        {
            return dogList;
        }

    }
}