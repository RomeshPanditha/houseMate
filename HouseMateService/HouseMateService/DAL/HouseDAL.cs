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
                int houseID = Convert.ToInt32((from house in context.houses
                                              where house.houseName.Equals(houseName) && house.password.Equals(password)
                                              select house.PK_houseID).FirstOrDefault());

                int hID = Convert.ToInt32(context.houses
                    .Where(h => h.houseName.Equals(houseName) && h.password.Equals(password))
                    .Select(h => h.PK_houseID).FirstOrDefault());
                    

                tenant newTennant = new tenant
                {
                    FK_houseID = hID,
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
                    return new House(Convert.ToInt32((from tenant in context.tenants
                                                     where tenant.FK_aspMemberID == userID
                                                     select tenant.house.PK_houseID).FirstOrDefault()), // house ID
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

        public House createHouse(string housename, string password, int userID)
        {
            using (houseMateEntities01 context = new houseMateEntities01())
            {
                if (!houseExists(housename))
                {
                    // create the new house
                    house newHouse = new house
                    {
                        houseName = housename,
                        password = password,
                        address = "123 fake St",
                        city = "Springfield",
                        postcode = 1111,
                        state = "NSW"
                    };
                    context.houses.Add(newHouse);
                    context.SaveChanges();

                    // create the list for that house
                    list newList = new list
                    {
                        FK_houseID = newHouse.PK_houseID
                    };
                    context.lists.Add(newList);
                    context.SaveChanges();

                    // create the notice board for that house
                    notice_board newNBoard = new notice_board
                    {
                        FK_houseID = newHouse.PK_houseID
                    };
                    context.notice_board.Add(newNBoard);
                    context.SaveChanges();

                    return joinHouse(housename, password, userID);
                }
                else
                {
                    return new House(-1, "no house");
                }
            }
        }

        private bool houseExists(string housename)
        {
            using (houseMateEntities01 context = new houseMateEntities01())
            {
                house existing = (house)(from house in context.houses
                                            where house.houseName.Equals(housename)
                                            select house);

                if (existing != null)
                {
                    return true;
                }

                return false;
            }
        }
    }
}