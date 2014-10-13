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

        public UserCreated(bool _created)
        {
            created = _created;
        }

        [DataMember]
        public bool createdSucess { get { return created; } set { } }
    }
}