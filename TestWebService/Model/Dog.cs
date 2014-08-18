using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TestWebService.Model
{
    
    public class Dog
    {
        public Dog(string dogName, string dogBreed, string dogAge)
        {
            name = dogName;
            breed = dogBreed;
            age = Convert.ToInt32(dogAge);
        }

        

        public string name { get; set; }

        public string breed { get; set; }

        public Int32 age { get; set; }

    }
}