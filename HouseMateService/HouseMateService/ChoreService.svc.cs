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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ChoreService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ChoreService.svc or ChoreService.svc.cs at the Solution Explorer and start debugging.
    public class ChoreService : IChoreService
    {
        ChoresDAL DAL = new ChoresDAL();

        public void addChore(int hid, string cName)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.addChore(hid, cName);
            }
        }

        public void allocateChore(int hid, string cName, int tID, string dow, int cyc)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.allocateChore(hid, cName, tID, dow, cyc);
            }
        }

        public Chore[] getChores(int hid)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getChores(hid).ToArray();
            }
            else
            {
                return null;
            }
        }
    }
}
