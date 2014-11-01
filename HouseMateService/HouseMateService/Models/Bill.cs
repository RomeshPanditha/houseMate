using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class Bill
    {
     
        private int billID_;
        private double totalAmount_;
        private string category_;
        private DateTime dueDate_;
        private string[] tenantNames;
        private string[] tenantAmounts;
        private string[] tenPaid;
        private int[] tenIDs;
        private int numT;
        

        public Bill(int billID, double totalAmount, string category, DateTime dueDate, string[] names, string[] amounts, string[] tPaid, int[] tIDs, int numTenants)
        {
            billID_ = billID;
            totalAmount_ = totalAmount;
            category_ = category;
            dueDate_ = dueDate;
            tenantNames = names;
            tenantAmounts = amounts;
            tenPaid = tPaid;
            tenIDs = tIDs;
            numT = numTenants;
        }
        


        [DataMember]
        public int billID { get { return billID_; } set { billID_ = value; } }
        [DataMember]
        public double totalAmount { get { return totalAmount_; } set { totalAmount_ = value; } }
        [DataMember]
        public string category { get { return category_; } set { category_ = value; } }
        [DataMember]
        public DateTime dueDate { get { return dueDate_; } set { dueDate_ = value; } }
        [DataMember]
        public int[] tIDs { get { return tenIDs; } set { } }
        [DataMember]
        public string[] tNames { get { return tenantNames; } set { } }
        [DataMember]
        public string[] tAmounts { get { return tenantAmounts; } set { } }
        [DataMember]
        public string[] tPaid { get { return tenPaid; } set { } }
        [DataMember]
        public int tNum { get { return numT; } set {} }
    }
    
}