using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace HouseMateService.DAL
{
    public class BillsDAL
    {

        public BillsDAL()
        {
            
        }

        public List<Bill> getBills(int houseID)
        {
            List<Bill> billList = new List<Bill>();
            using(var context = new houseMateEntities())
            {
                List<house_bill> billL = new List<house_bill>();
                billL.AddRange(from house_bill in context.house_bill
                               where house_bill.FK_houseID == houseID
                               select house_bill);

                int tNum = getNumTenants(houseID);

                foreach (house_bill h in billL)
                {
                    billList.Add(new Bill(h.PK_houseBillID, h.amount, h.billType, h.dueDate, tNum));
                } 
            }
            return billList;
        }

        public List<tenantBill> getInividuals(int billID)
        {
            List<tenantBill> tenList = new List<tenantBill>();
            using(var context = new houseMateEntities())
            {
                List<individual_bills> tenL = new List<individual_bills>();
                tenL.AddRange(from individual_bills in context.individual_bills
                              where individual_bills.PK_indivBillID == billID
                              select individual_bills);
                foreach (individual_bills i in tenL)
                {
                    tenList.Add(new tenantBill(i.PK_indivBillID, i.tenant.name, Convert.ToDouble(i.splitAmount)));
                }
            }
            return tenList;
        }

        private int getNumTenants(int houseID)
        {
            int numTenants = 0;
            using(var context = new houseMateEntities())
            {
                List<tenant> tenantList = new List<tenant>();
                tenantList.AddRange(from tenant in context.tenants
                                    where tenant.FK_houseID == houseID
                                    select tenant);
                foreach(tenant t in tenantList)
                {
                    numTenants++;
                }
            }
            return numTenants;
        }
    }
}