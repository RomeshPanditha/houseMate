using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class UserAuth
    {
        private bool logged;
        private int uid;

        public UserAuth(bool _logged, int _uid)
        {
            logged = _logged;
            uid = _uid;
        }

        [DataMember]
        public bool loggedIn { get{return logged;} set{} }
        [DataMember]
        public int UID { get { return uid; } set { } }
    }
}