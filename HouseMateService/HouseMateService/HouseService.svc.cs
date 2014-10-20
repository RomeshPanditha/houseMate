using HouseMateService.DAL;
using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "HouseService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select HouseService.svc or HouseService.svc.cs at the Solution Explorer and start debugging.
    public class HouseService : IHouseService
    {
        HouseDAL DAL = new HouseDAL();

        public House joinHouse(string housename, string password, int uid)
        {
            return DAL.joinHouse(housename, password, uid);
        }

        public House getHouse(int uid)
        {
            return DAL.getHouse(uid);
        }

        public House createHouse(string housename, string password, int uid, string addr, string city, string state, int pCode)
        {
            return DAL.createHouse(housename, password, uid, addr, city, state, pCode);
        }
    }
}
