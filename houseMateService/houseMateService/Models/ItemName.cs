using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class ItemName
    {
        private int PKID_;
        private string name_;

        public ItemName(string name, int PKID)
        {
            name_ = name;
            PKID_ = PKID;
        }

        [DataMember]
        public string name { get { return name_; } set { name_ = value; } }
        [DataMember]
        public int PKID { get { return PKID_; } set { PKID_ = value; } }
        

    }
}