using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class tenantBill
    {
        private int billID_;
        private string tenantName_;
        private double amount_;
        private string paid_;
        private int tenID_;

        public tenantBill(int billID, string tenantName, double amount, DateTime? paid, int tenID)
        {
             billID_ = billID;
             tenantName_ = tenantName;
             amount_ = amount;
             paid_ = paid.ToString();
             tenID_ = tenID;
        }
        

        [DataMember]
        public int billID { get { return billID_; } set { billID_ = value; } }
        [DataMember]
        public string tenantName { get { return tenantName_; } set { tenantName_ = value; } }
        [DataMember]
        public double amount { get { return amount_; } set { amount_ = value; } }
        [DataMember]
        public string paid { get { return paid_; } set { paid_ = value; } }
        [DataMember]
        public int tenID { get { return tenID_; } set { tenID_ = value; } }

    }
}