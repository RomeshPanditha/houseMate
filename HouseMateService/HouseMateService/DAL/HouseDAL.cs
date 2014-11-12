using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class HouseDAL
    {
        public HouseInfo getInfo(int houseID)
        {
            using (var context = new houseMateEntities01())
            {
                house currH = context.houses
                                .Where(h => h.PK_houseID == houseID)
                                .Select(h => h).Single();

                return new HouseInfo(currH.houseName, currH.password, currH.wifiPass, currH.binNight, Convert.ToInt32(currH.recycOrGreen));
            }
        }

        public void setInfo(int houseID, string houseName, string housePwd, string wifi, string binNight, string recOrGre)
        {
            using (var context = new houseMateEntities01())
            {
                house currH = context.houses
                                .First(h => h.PK_houseID == houseID);
                if (houseName != "") currH.houseName = houseName;
                if (housePwd != "") currH.password = housePwd;
                if(wifi != "") currH.wifiPass = wifi;
                if (binNight != "") currH.binNight = binNight;
                if (recOrGre != "")
                {
                    if (recOrGre == "recycling") currH.recycOrGreen = 0;
                    else currH.recycOrGreen = 1;
                }
                context.SaveChanges();
            }
        }

        public List<myTenant> getTenants(int houseID)
        {
            List<myTenant> tList = new List<myTenant>();
            using (var context = new houseMateEntities01())
            {
                List<tenant> tenants = new List<tenant>();
                tenants.AddRange(from t in context.tenants
                                 where(t.FK_houseID == houseID && t.isCurrent == 0)
                                 select t);
                foreach (tenant t in tenants)
                {
                    tList.Add(new myTenant(t.PK_tenantID, t.my_aspnet_membership.Email));
                }
            }
            return tList;
        }

        //public string getHouseName(int houseID)
        //{
        //    using (var context = new houseMateEntities01())
        //    {
        //        return context.houses
        //            .Where(h=> h.PK_houseID == houseID)
        //            .Select(h=> h.houseName).Single();
        //    }
        //}

        //public string getHousePass(int houseID)
        //{
        //    using (var context = new houseMateEntities01())
        //    {
        //        return context.houses
        //            .Where(h => h.PK_houseID == houseID)
        //            .Select(h => h.password).Single();
        //    }
        //}

        //public void setHouseName(int houseID, string newHouseName)
        //{
        //    using (var context = new houseMateEntities01())
        //    {
        //        house current = context.houses
        //            .First(h=> h.PK_houseID == houseID);
        //        current.houseName = newHouseName;
        //        context.SaveChanges();
        //    }

        //}

        //public void setHousePass(int houseID, string newHousePass)
        //{
        //    using (var context = new houseMateEntities01())
        //    {
        //        house current = context.houses
        //            .First(h => h.PK_houseID == houseID);
        //        current.password = newHousePass;
        //        context.SaveChanges();
        //    }
        //}

        public int leaveHouse(int uid)
        {
            using (var context = new houseMateEntities01())
            {
                try
                {
                    tenant current = context.tenants
                                .First(t => t.my_aspnet_membership.userId == uid);
                    current.isCurrent = 1;
                    context.SaveChanges();
                    return 1;
                }
                catch
                {
                    return -1;
                }
            }
        }

        public int getTID(int uid)
        {
            using (var context = new houseMateEntities01())
            {
                return Convert.ToInt32(context.tenants
                    .Where(t=> t.FK_aspMemberID == uid && t.isCurrent == 0)
                    .Select(t=> t.PK_tenantID).FirstOrDefault());
            }
        }

        public House joinHouse(string houseName, string password, int userID)
        {
            using (var context = new houseMateEntities01())
            {
                if (getTID(userID) <= 0)
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
                else
                {
                    return new House(-1, "already in a house");
                }
            }
        }

        public void updateRegID(int tenID, string regID)
        {
            using (var context = new houseMateEntities01())
            {
                try
                {
                    var ten1 = (from t in context.tenants
                                where t.PK_tenantID == tenID
                                select t).FirstOrDefault();
                    ten1.registrationID = regID;
                    context.SaveChanges();
                }
                catch
                {

                }
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
                             where t.FK_aspMemberID == userID && t.isCurrent == 0
                             select t.house.houseName).Single();
                    string hName = hn;

                    return new House(Convert.ToInt32((from t in context.tenants
                                                      where t.FK_aspMemberID == userID && t.isCurrent == 0
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
                    if (getTID(userID) <= 0)
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
                        return new House(-1, "already in a house");
                    }
                }
                else
                {
                    return new House(-1, "house doesn't exist");
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