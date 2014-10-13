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

        public string createUser(string username, string password, string email)
        {
            System.Web.Security.Membership.CreateUser(username, password, email);
            return "success";
        }

        public UserAuth login(string username, string password)
        {
            if (System.Web.Security.Membership.ValidateUser(username, password))
            {
                //String UID = DAL.getUid(username).ToString();
                //int uid = System.Web.HttpContext.Current.User.Identity.GetUserId();
                System.Web.Security.MembershipUser CurrentUser = System.Web.Security.Membership.GetUser(username);
                int uid = Convert.ToInt32(CurrentUser.ProviderUserKey);
                HttpContext.Current.Session["loggedIn"] = uid.ToString();
                return new UserAuth(true, uid);
            }
            else
            {
                HttpContext.Current.Session["loggedIn"] = -1;
                return new UserAuth(false, -1);
            }
        }


        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public string logout()
        {
            HttpContext.Current.Session["loggedIn"] = "out";
            return "logged out";
        }
    }
}
