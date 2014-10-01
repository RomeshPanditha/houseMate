using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BillService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select BillService.svc or BillService.svc.cs at the Solution Explorer and start debugging.
    public class BillService : IBillService
    {

        private DAL.BillsDAL DAL = new DAL.BillsDAL();


        public Bill[] getBills(int houseID)
        {
            return DAL.getBills(houseID).ToArray();
        }

        public tenantBill[] getIndividuals(int billID)
        {
            return DAL.getInividuals(billID).ToArray();
        }


        public Bill[] addBill(int houseID, string billType, double amount, string tenantIDs, string tenantAmounts)
        {
            DAL.addBill(houseID, billType, amount, tenantIDs.Split('~'), tenantAmounts.Split('~'));
            return getBills(houseID);
        }

    }
}
