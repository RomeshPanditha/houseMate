using HouseMateService.Models;
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
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "joinHouse?housename={housename}&password={password}&uid={uid}")]
        House joinHouse(string housename, string password, int uid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "leaveHouse?uid={uid}")]
        int leaveHouse(int uid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getHouse?uid={uid}")]
        House getHouse(int uid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getTID?uid={uid}")]
        int getTID(int uid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "createHouse?housename={housename}&password={password}&uid={uid}&addr={addr}&city={city}&state={state}")]
        House createHouse(string housename, string password, int uid, string addr, string city, string state);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getInfo?hid={hid}")]
        HouseInfo getInfo(int hid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "setInfo?hid={hid}&hName={hName}&hPwd={hPwd}&wifi={wifi}&binNight={binNight}&recOrGre={recOrGre}")]
        void setInfo(int hid, string hName, string hPwd, string wifi, string binNight, string recOrGre);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getTenants?hid={hid}")]
        myTenant[] getTenants(int hid);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "updateRegID?tid={tid}&regID={regID}")]
        void updateRegID(int tid, string regID);
    }
}
