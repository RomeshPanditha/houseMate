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
        private int cNum_;
        private string[] cNames_;


        public Chore(string c, string t, string d, int cNo, string[] cNames)
        {
            choreName_ = c;
            tenantName_ = t;
            dayOfWeek_ = d;
            cNum_ = cNo;
            cNames_ = cNames;
        }

        [DataMember]
        public string choreName { get { return choreName_; } set { choreName_ = value; } }
        [DataMember]
        public string tenName { get { return tenantName_; } set { tenantName_ = value;  } }
        [DataMember]
        public string dow { get { return dayOfWeek_; } set { dayOfWeek_ = value; } }
        [DataMember]
        public int cNum { get { return cNum_; } set { cNum_ = value; } }
        [DataMember]
        public string[] cNames { get { return cNames_; } set { cNames_ = value; } }
    }
}