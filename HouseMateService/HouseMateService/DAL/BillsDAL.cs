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
                    billList.Add(new Bill(h.PK_houseBillID, h.amount, h.billType, Convert.ToDateTime(h.dueDate), tNum));
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
                              where individual_bills.FK_houseBillID == billID
                              select individual_bills);
                foreach (individual_bills i in tenL)
                {
                    string name = (from my_aspnet_users in context.my_aspnet_users
                                    where my_aspnet_users.id == i.tenant.FK_aspMemberID
                                    select my_aspnet_users.name).ToString();

                    tenList.Add(new tenantBill(i.FK_houseBillID, name, Convert.ToDouble(i.splitAmount)));
                }
            }
            return tenList;
        }

        public void addBill(int _houseID, string _billType, double _amount, string[] _tenantID, string[] _tenantAmounts)
        {
            using (var context = new houseMateEntities())
            {
                house_bill newHouseBill = new house_bill
                {
                    FK_houseID = _houseID,
                    billType = _billType,
                    amount = _amount,
                    dueDate = DateTime.Now,
                    paid_ = 0
                };
                context.house_bill.Add(newHouseBill);
                context.SaveChanges();
                for (int i = 0; i < _tenantID.Length; i++)
                {
                    individual_bills newIndividualBill = new individual_bills
                    {
                        FK_houseBillID = newHouseBill.PK_houseBillID,
                        FK_tenantID = Convert.ToInt32(_tenantID[i]),
                        splitAmount = Convert.ToDouble(_tenantAmounts[i])
                    };
                    context.individual_bills.Add(newIndividualBill);
                    context.SaveChanges();
                }
            }
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