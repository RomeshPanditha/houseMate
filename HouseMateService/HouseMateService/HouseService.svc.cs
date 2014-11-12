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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "HouseService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select HouseService.svc or HouseService.svc.cs at the Solution Explorer and start debugging.
    public class HouseService : IHouseService
    {
        HouseDAL DAL = new HouseDAL();

        public House joinHouse(string housename, string password, int uid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.joinHouse(housename, password, uid);
            }
            else
            {
                return null;
            }
        }

        public House getHouse(int uid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getHouse(uid);
            }
            else
            {
                return null;
            }
        }

        public House createHouse(string housename, string password, int uid, string addr, string city, string state)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.createHouse(housename, password, uid, addr, city, state);
            }
            else
            {
                return null;
            }
        }


        public int getTID(int uid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getTID(uid);
            }
            else
            {
                return -1;
            }
        }


        public int leaveHouse(int uid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.leaveHouse(uid);
            }
            else
            {
                return -1;
            }
        }

        public HouseInfo getInfo(int hid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getInfo(hid);
            }
            else
            {
                return null;
            }
        }

        public void setInfo(int hid, string hName, string hPwd, string wifi, string binNight, string recOrGre)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.setInfo(hid, hName, hPwd, wifi, binNight, recOrGre);
            }
        }


        public myTenant[] getTenants(int hid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getTenants(hid).ToArray();
            }
            else
            {
                return null;
            }
        }


        public void updateRegID(int tid, string regID)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.updateRegID(tid, regID);
            }
        }
    }
}
