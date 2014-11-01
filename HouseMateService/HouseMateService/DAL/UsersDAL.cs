using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class UsersDAL
    {
        public string getTenName(int tid)
        {
            using (var context = new houseMateEntities01())
            {
                var name_ = from t in context.tenants
                              where t.FK_aspMemberID == tid && t.isCurrent == 0
                              select t.my_aspnet_membership.Email;
                string name = name_.ToString();
                return name;
            }
        }
    }
}