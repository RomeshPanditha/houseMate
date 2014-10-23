using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class myTenant
    {
        private int tenID_;
        private string tenName_;

        public myTenant(int tenID, string tenName)
        {
            tenID_ = tenID;
            tenName_ = tenName;
        }

        [DataMember]
        public int tenID { get { return tenID_; } set { tenID_ = value; } }
        [DataMember]
        public string tenName { get { return tenName_; } set { tenName_ = value; } }
    }
}