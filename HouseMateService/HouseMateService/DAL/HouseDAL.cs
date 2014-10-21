using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class HouseDAL
    {
        public int getTID(int uid)
        {
            using (var context = new houseMateEntities01())
            {
                return Convert.ToInt32(context.tenants
                    .Where(t=> t.FK_aspMemberID == uid)
                    .Select(t=> t.PK_tenantID).FirstOrDefault());
            }
        }

        public House joinHouse(string houseName, string password, int userID)
        {
            using (var context = new houseMateEntities01())
            {
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
            using (var context = new houseMateEntities01())
            {
                try
                {
                    var hn = (from t in context.tenants
                             where t.FK_aspMemberID == userID
                             select t.house.houseName).Single();
                    string hName = hn;

                    return new House(Convert.ToInt32((from t in context.tenants
                                                     where t.FK_aspMemberID == userID
                                                     select t.house.PK_houseID).FirstOrDefault()),  hName); 
                                                 
                }
                catch
                {
                    return new House(-1, "no house");
                }
            }
        }

        public House createHouse(string housename, string password, int userID, string _addr, string _city, string _state)
        {
            using (var context = new houseMateEntities01())
            {
                if (!houseExists(housename))
                {
                    // create the new house
                    house newHouse = new house
                    {
                        houseName = housename,
                        password = password,
                        address = _addr,
                        city = _city,
                        state = _state
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
            using (var context = new houseMateEntities01())
            {

                bool existing = context.houses.Any(h => h.houseName.Equals(housename));

                if (existing)
                {
                    return true;
                }

                return false;
            }
        }
    }
}