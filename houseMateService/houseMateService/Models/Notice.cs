using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class Notice
    {
        private int noticeID_;
        private string noticeTitle_;
        private string noticeDesc_;
        private DateTime date_;
        private string tenantName_;
        //private bool approve_;


        public Notice(int noticeID, string noticeTitle, string noticeDesc, DateTime date, string tenantName)
        {
            noticeID_ = noticeID;
            noticeTitle_ = noticeTitle;
            noticeDesc_ = noticeDesc;
            date_ = date;
            tenantName_ = tenantName;
            //approve_ = approve;
        }

        [DataMember]
        public int noticeID { get { return noticeID_; } set { noticeID_ = value; } }
        [DataMember]
        public string noticeTitle { get { return noticeTitle_; } set { noticeTitle_ = value; } }
        [DataMember]
        public string noticeDesc { get { return noticeDesc_; } set { noticeDesc_ = value; } }
        [DataMember]
        public DateTime date { get { return date_; } set { date_ = value; } }
        [DataMember]
        public string tenantName { get { return tenantName_; } set { tenantName_ = value; } }
        /*  [DataMember]
            public bool approve { get { return approve_; } set { approve_ = value; } } */
    }
}