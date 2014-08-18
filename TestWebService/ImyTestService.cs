using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using TestWebService.Model;

namespace TestWebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ImyTestService" in both code and config file together.
    [ServiceContract]
    public interface ImyTestService
    {
        [OperationContract]
        string getMessage();

        [OperationContract]
        Person[] GetPeople();

        [OperationContract]
        Person[] SavePerson(string name);

        [OperationContract]
        DogData[] getDogs();

        [OperationContract]
        DogData[] addDog(string dogName, string dogBreed, string dogAge);
    }

    [DataContract(Name="Person")]
    public class Person
    {
        private string _name;

        [DataMember(Name = "name")]
        public string name { get { return _name;} set {_name = value;} }

    }

    [DataContract]
    public class DogData
    {
        [DataMember(Name = "dogName")]
        public string dogName { get; set; }

        [DataMember(Name = "dogBreed")]
        public string dogBreed { get; set; }

        [DataMember(Name = "dogAge")]
        public string dogAge { get; set; }
    }
}
