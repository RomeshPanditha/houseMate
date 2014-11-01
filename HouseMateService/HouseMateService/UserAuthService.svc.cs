using HouseMateService.DAL;
using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Web;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "UserAuthService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select UserAuthService.svc or UserAuthService.svc.cs at the Solution Explorer and start debugging.
    public class UserAuthService : IUserAuthService
    {
        UsersDAL DAL = new UsersDAL();

        public UserCreated createUser(string username, string password, string email)
        {
            try
            {
                System.Web.Security.Membership.CreateUser(username, password, email);

                return new UserCreated(true , getUID(username));
            }
            catch
            {
                return new UserCreated(false, -1);
            }
        }

        public UserAuth login(string username, string password)
        {
            if (System.Web.Security.Membership.ValidateUser(username, password))
            {
                int uid = getUID(username);
                HttpContext.Current.Session["loggedIn"] = uid.ToString();
                return new UserAuth(true, uid);
            }
            else
            {
                HttpContext.Current.Session["loggedIn"] = -1;
                return new UserAuth(false, -1);
            }
        }

        private int getUID(string username)
        {
            System.Web.Security.MembershipUser CurrentUser = System.Web.Security.Membership.GetUser(username);
            return Convert.ToInt32(CurrentUser.ProviderUserKey);
        }


        public string GetTenant(int tid)
        {
            return DAL.getTenName(tid);
        }

        public void logout()
        {
            HttpContext.Current.Session["loggedIn"] = -1;
        }
    }
}
