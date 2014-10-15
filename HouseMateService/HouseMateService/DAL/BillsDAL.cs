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
            using(var context = new houseMateEntities01())
            {
                List<house_bill> billL = new List<house_bill>();
                billL.AddRange(from h in context.house_bill
                               where h.FK_houseID == houseID
                               select h);

                int tNum = getNumTenants(houseID);

                foreach (house_bill h in billL)
                {
                    if (h.paid_ != 0)
                    {
                        billList.Add(new Bill(h.PK_houseBillID, h.amount, h.billType, Convert.ToDateTime(h.dueDate), tNum));
                    }
                } 
            }
            return billList;
        }

        public List<tenantBill> getInividuals(int billID)
        {
            List<tenantBill> tenList = new List<tenantBill>();
            using(var context = new houseMateEntities01())
            {
                List<individual_bills> tenL = new List<individual_bills>();
                tenL.AddRange(from i in context.individual_bills
                              where i.FK_houseBillID == billID
                              select i);
                foreach (individual_bills i in tenL)
                {
                    string name = System.Web.Security.Membership.GetUserNameByEmail(i.tenant.my_aspnet_membership.Email);
                    DateTime? date;
                    if (i.datePaid != null) date = (DateTime)i.datePaid;
                    else date = null;

                        tenList.Add(new tenantBill(i.FK_houseBillID, name, Convert.ToDouble(i.splitAmount), date));
                }
            }
            return tenList;
        }

        public void addBill(int _houseID, string _billType, double _amount, string[] _tenantID, string[] _tenantAmounts)
        {
            using (var context = new houseMateEntities01())
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
            using(var context = new houseMateEntities01())
            {
                List<tenant> tenantList = new List<tenant>();
                tenantList.AddRange(from t in context.tenants
                                    where t.FK_houseID == houseID
                                    select t);
                foreach(tenant t in tenantList)
                {
                    numTenants++;
                }
            }
            return numTenants;
        }

        public void payBill(int billID, int tenantID)
        {
            using (var context = new houseMateEntities01())
            {
                individual_bills bill = context.individual_bills
                                        .First(i => i.FK_houseBillID == billID && i.FK_tenantID == tenantID);
                bill.datePaid = DateTime.Now;
                context.SaveChanges();

                if(CheckFullyPaid(billID))
                {
                    house_bill mainBill = context.house_bill
                                          .First(b=>b.PK_houseBillID == billID);
                    mainBill.paid_ = 1;
                    context.SaveChanges();
                }

                // Record payment here

            }
        }

        private bool CheckFullyPaid(int billID)
        {
            using (var context = new houseMateEntities01())
            {
                List<individual_bills> bills = new List<individual_bills>();
                bills.AddRange(from b in context.individual_bills
                               where b.FK_houseBillID == billID
                               select b);
                foreach (individual_bills b in bills)
                {
                    if (b.datePaid == null)
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}