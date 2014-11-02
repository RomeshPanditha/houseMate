using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class ChoresDAL
    {
        public void addChore(int houseID, string choreName_)
        {
            using (var context = new houseMateEntities01())
            {
                chore newChore = new chore
                {
                    FK_houseID = houseID,
                    choreName = choreName_
                };
                context.chores.Add(newChore);
                context.SaveChanges();
            }
        }

        public void allocateChore(int houseID, string cName, int tenantID, string dayOfWeek_, int cycle_)
        {
            using (var context = new houseMateEntities01())
            {
                chore chore_ = context.chores.First(c=>c.FK_houseID == houseID && c.choreName.Equals(cName));

                chore_allocation newAllocation = new chore_allocation
                {
                    FK_choreID = chore_.PK_choreID,
                    FK_tenantID = tenantID,
                    dayOfWeek = dayOfWeek_,
                    cycle = (sbyte)cycle_
                };
                context.chore_allocation.Add(newAllocation);
                context.SaveChanges();
            }
        }

        public List<Chore> getChores(int houseID)
        {
            List<Chore> choreList = new List<Chore>();
            using (var context = new houseMateEntities01())
            {
                List<chore_allocation> cList = new List<chore_allocation>();
                cList.AddRange(from c in context.chore_allocation
                               where(c.chore.FK_houseID == houseID)
                               select c);

                List<int> tids_ = new List<int>();
                tids_.AddRange(from t in context.tenants
                               where t.FK_houseID == houseID
                               select t.PK_tenantID);
                int[] tids = tids_.ToArray();

                List<string> tNameLi = new List<string>();
                tNameLi.AddRange(from t in context.tenants
                                 where t.FK_houseID == houseID && t.isCurrent == 0
                                 select t.my_aspnet_membership.Email);

                string[] tNames = tNameLi.ToArray();

                List<string> nameLi = new List<string>();
                nameLi.AddRange(from c in context.chores
                                where c.FK_houseID == houseID
                                select c.choreName);
                string[] names = nameLi.ToArray();

                int numChores = names.Length;

                chore_allocation[] cArr = cList.ToArray();
                if (cArr.Length < 1)
                {
                    choreList.Add(new Chore("", "", "", numChores, names, tNames, tids));
                }
                else
                {
                    foreach (chore_allocation c in cArr)
                    {
                        choreList.Add(new Chore(c.chore.choreName, c.tenant.my_aspnet_membership.Email, c.dayOfWeek, numChores, names, tNames, tids));
                    }
                }

                
            }
            return choreList;
        }

        
    }
}