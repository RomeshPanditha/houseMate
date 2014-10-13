using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class House
    {
        private int houseID;
        private string houseName;

        public House(int _houseID, string _houseName)
        {
            houseID = _houseID;
            houseName = _houseName;
        }

        [DataMember]
        public int HID { get { return houseID; } set { } }

        [DataMember]
        public string hName { get { return houseName; } set { } }
    }
}