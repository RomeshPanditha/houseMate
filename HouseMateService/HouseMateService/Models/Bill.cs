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
        

        public Bill(int billID, double totalAmount, string category, DateTime dueDate, int numTenants)
        {
            int billID_ = billID;
            double totalAmount_ = totalAmount;
            string category_ = category;
            DateTime dueDate_ = dueDate;
            tenantNames = new string[numTenants];
        }



        [DataMember]
        public int billID { get { return billID_; } set { billID_ = value; } }
        [DataMember]
        public double totalAmount { get { return totalAmount_; } set { totalAmount_ = value; } }
        [DataMember]
        public string category { get { return category_; } set { category_ = value; } }
        [DataMember]
        public DateTime dueDate { get { return dueDate_; } set { dueDate_ = value; } }

    }
    
}