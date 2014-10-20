using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class UserCreated
    {
        private bool created;
        private int uid;

        public UserCreated(bool _created, int _uid)
        {
            created = _created;
            uid = _uid;
        }

        [DataMember]
        public bool createdSuccess { get { return created; } set { } }
        [DataMember]
        public int UID { get { return uid; } set { } }
    }
}