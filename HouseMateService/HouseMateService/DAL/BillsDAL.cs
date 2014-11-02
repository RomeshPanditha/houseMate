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
            // create the list to be returned
            List<Bill> billList = new List<Bill>();
            using(var context = new houseMateEntities01())
            {
                // select house bills for a house that have not been paid
                List<house_bill> billL = new List<house_bill>();
                billL.AddRange(from h in context.house_bill
                               where h.FK_houseID == houseID && h.paid_ == 0
                               select h);

                int tNum = getNumTenants(houseID);

                foreach (house_bill h in billL)
                {
                    // get individual amouts for each bill
                    List<tenantBill> tList = getInividuals(h.PK_houseBillID);
                    tenantBill[] tenList = new tenantBill[tNum];
                    int incr = 0;
                    foreach (tenantBill t in tList)
                    {
                        tenList[incr] = t;
                        incr++;
                    }
                    
                    string[] names = new string[tNum];
                    string[] amounts = new string[tNum];
                    string[] paid = new string[tNum];
                    int[] tIDs = new int[tNum];
                    for (int i = 0; i < tNum; i++ )
                    {
                        if (tenList[i] != null)
                        {
                            names[i] = tenList[i].tenantName;
                            amounts[i] = tenList[i].amount.ToString();
                            paid[i] = tenList[i].paid;
                            tIDs[i] = tenList[i].tenID;
                        }
                        else
                        {
                            names[i] = "";
                            amounts[i] = "";
                            paid[i] = "";
                            tIDs[i] = -1;
                        }
                    }

                    // add bills to a list to be returned
                    billList.Add(new Bill(h.PK_houseBillID, h.amount, h.billType, Convert.ToDateTime(h.dueDate), names, amounts, paid, tIDs, tNum));

                } 
            }
            List<Bill> orderedBillList = billList.OrderBy(o => o.dueDate).ToList();
            return orderedBillList;
        }

        public List<tenantBill> getInividuals(int billID)
        {
            // create a list to be returned
            List<tenantBill> tenList = new List<tenantBill>();
            using(var context = new houseMateEntities01())
            {
                // select individual bills for a billID for all current tenants
                List<individual_bills> tenL = new List<individual_bills>();
                tenL.AddRange(from i in context.individual_bills
                              where i.FK_houseBillID == billID && i.tenant.isCurrent == 0
                              select i);

                // fill return list with selected values
                foreach (individual_bills i in tenL)
                {
                    string name = i.tenant.my_aspnet_membership.Email;
                    DateTime? date;
                    if (i.datePaid != null) date = (DateTime)i.datePaid;
                    else date = null;

                    tenList.Add(new tenantBill(i.FK_houseBillID, name, Convert.ToDouble(i.splitAmount), date, i.FK_tenantID));
                }
            }
            return tenList;
        }

        public void addBill(int _houseID, string _billType, double _amount, DateTime dueDate, string[] _tenantID, string[] _tenantAmounts)
        {
            using (var context = new houseMateEntities01())
            {
                // create a new house bill
                house_bill newHouseBill = new house_bill
                {
                    FK_houseID = _houseID,
                    billType = _billType,
                    amount = _amount,
                    dueDate = dueDate,
                    paid_ = 0
                };
                context.house_bill.Add(newHouseBill);
                context.SaveChanges();

                // create individual bills for each tenant in the house
                for (int i = 0; i < _tenantID.Length; i++)
                {
                    if(_tenantAmounts[i] != "0")
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
        }

        private int getNumTenants(int houseID)
        {
            int numTenants = 0;
            using(var context = new houseMateEntities01())
            {
                // select all current tenants in a house
                List<tenant> tenantList = new List<tenant>();
                tenantList.AddRange(from t in context.tenants
                                    where t.FK_houseID == houseID && t.isCurrent == 0
                                    select t);
                foreach(tenant t in tenantList)
                {
                    // count the tenants
                    numTenants++;
                }
            }
            return numTenants;
        }

        public void payBill(int billID, int tenantID)
        {
            using (var context = new houseMateEntities01())
            {
                // select the individual bill for the tenant and mark it as paid
                individual_bills bill = context.individual_bills
                                        .First(i => i.FK_houseBillID == billID && i.FK_tenantID == tenantID);
                bill.datePaid = DateTime.Now;
                context.SaveChanges();

                // if all tenants have paid this bill then mark the whole bill as paid
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
                // select the individual bills for a given bill
                List<individual_bills> bills = new List<individual_bills>();
                bills.AddRange(from b in context.individual_bills
                               where b.FK_houseBillID == billID
                               select b);

                // if any one individual bill has not been paid, return false. else the bill has been paid
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