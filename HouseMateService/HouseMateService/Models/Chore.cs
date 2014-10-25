using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class Chore
    {
        private string choreName_;
        private string tenantName_;
        private string dayOfWeek_;


        public Chore(string c, string t, string d)
        {
            choreName_ = c;
            tenantName_ = t;
            dayOfWeek_ = d;
        }

        [DataMember]
        public string choreName { get { return choreName_; } set { choreName_ = value; } }
        [DataMember]
        public string tenName { get { return tenantName_; } set { tenantName_ = value;  } }
        [DataMember]
        public string dow { get { return dayOfWeek_; } set { dayOfWeek_ = value; } }

    }
}