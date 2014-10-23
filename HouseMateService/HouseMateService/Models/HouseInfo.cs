using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace HouseMateService.Models
{
    [DataContract]
    public class HouseInfo
    {
        private string houseName_;
        private string housePwd_;
        private string wifi_;
        private string binNight_;
        private int recycOrGreen_;

        public HouseInfo(string houseName, string housePwd, string wifi, string binNight,int recycOrGreen)
        {
            houseName_ = houseName;
            housePwd_ = housePwd;
            wifi_ = wifi;
            binNight_ = binNight;
            recycOrGreen_ = recycOrGreen;
        }

        [DataMember]
        public string houseName { get { return houseName_; } set { houseName_ = value; } }
        [DataMember]
        public string housePwd { get { return housePwd_; } set { housePwd_ = value; } }
        [DataMember]
        public string wifi { get { return wifi_; } set { wifi_ = value; } }
        [DataMember]
        public string binNight { get { return binNight_; } set { binNight_ = value; } }
        [DataMember]
        public int recycOrGreen { get { return recycOrGreen_; } set { recycOrGreen_ = value; } }

    }
}