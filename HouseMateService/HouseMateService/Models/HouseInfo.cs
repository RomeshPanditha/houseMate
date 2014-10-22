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
        private string wifi_;
        private string binNight_;
        private int recycOrGreen_;

        public HouseInfo(string wifi, string binNight,int recycOrGreen)
        {
            wifi_ = wifi;
            binNight_ = binNight;
            recycOrGreen_ = recycOrGreen;
        }

        [DataMember]
        public string wifi { get { return wifi_; } set { wifi_ = value; } }
        [DataMember]
        public string binNight { get { return binNight_; } set { binNight_ = value; } }
        [DataMember]
        public int recycOrGreen { get { return recycOrGreen_; } set { recycOrGreen_ = value; } }

    }
}