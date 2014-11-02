using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Web;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BillService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select BillService.svc or BillService.svc.cs at the Solution Explorer and start debugging.
    public class BillService : IBillService
    {

        private DAL.BillsDAL DAL = new DAL.BillsDAL();


        public Bill[] getBills(int houseID)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getBills(houseID).ToArray();
            }
            else
            {
                return null;
            }
            
        }

        public tenantBill[] getIndividuals(int billID)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return DAL.getInividuals(billID).ToArray();
            }
            else
            {
                return null;
            }
            
        }


        public void addBill(int houseID, string billType, double amount, DateTime dueDate, string tenantIDs, string tenantAmounts)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.addBill(houseID, billType, amount, dueDate, tenantIDs.Split('~'), tenantAmounts.Split('~'));
                getBills(houseID);
            }
        }



        public void payBill(int billID, int tenantID)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.payBill(billID, tenantID);
                getIndividuals(billID);
            }
        }
    }
}
