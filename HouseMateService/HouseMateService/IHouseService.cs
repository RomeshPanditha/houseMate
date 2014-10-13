using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IHouseService" in both code and config file together.
    [ServiceContract]
    public interface IHouseService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "joinHouse?housename={housename}&password={password}")]
        string joinHouse(string housename, string password, int uid);
    }
}
