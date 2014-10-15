using HouseMateService.DAL;
using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Web;

namespace HouseMateService.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "NoticeBoardService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select NoticeBoardService.svc or NoticeBoardService.svc.cs at the Solution Explorer and start debugging.
    public class NoticeBoardService : INoticeBoardService
    {
        NoticeDAL DAL = new NoticeDAL();

        public Notice[] getNotices(int houseID, string type)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.GetNotices(houseID, type).ToArray();
            }
            else
            {
                return null;
            }
        }

        public Notice[] addNotice(int houseID, int tenantID, string title, string message, string type)
        {
            if(Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.addNotice(houseID, tenantID, title, message, type);
                return getNotices(houseID, type);
            }
            else
            {
                return null;
            }
        }
    }
}
