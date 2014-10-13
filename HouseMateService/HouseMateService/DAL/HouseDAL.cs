using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class HouseDAL
    {
        public House joinHouse(string houseName, string password, int userID)
        {
            using (houseMateEntities01 context = new houseMateEntities01())
            {
                int houseID = Convert.ToInt32(from house in context.houses
                                              where house.houseName.Equals(houseName)
                                              select house.PK_houseID);

                tenant newTennant = new tenant
                {
                    FK_houseID = houseID,
                    FK_aspMemberID = userID
                };
                context.tenants.Add(newTennant);
                context.SaveChanges();

                return getHouse(userID); 
            }
        }

        // if a user is associated with a house, return that house
        public House getHouse(int userID)
        {
            using (houseMateEntities01 context = new houseMateEntities01())
            {
                try
                {
                    return new House(Convert.ToInt32(from tenant in context.tenants
                                                     where tenant.FK_aspMemberID == userID
                                                     select tenant.house.PK_houseID), // house ID
                                                  (from tenant in context.tenants
                                                   where tenant.FK_aspMemberID == userID
                                                   select tenant.house.houseName).ToString()); // house Name
                }
                catch
                {
                    return new House(-1, "no house");
                }
            }
        }

        public House createHouse()
        {

        }
    }
}