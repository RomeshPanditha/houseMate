using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using TestWebService.BL;
using TestWebService.Model;

namespace TestWebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "SecondTestService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select SecondTestService.svc or SecondTestService.svc.cs at the Solution Explorer and start debugging.
    public class SecondTestService : ISecondTestService
    {
        public List<Dog> getDogs()
        {
            DogKeeper keeper = new DogKeeper();
            keeper.addDog("russ", "jack russel", "3");
            keeper.addDog("bingo", "pomeranian", "1");
            keeper.addDog("porsha", "labradore", "6");
            keeper.addDog("jatzy", "jack russel", "1");


            return keeper.getDogs();
        }
    }
}
