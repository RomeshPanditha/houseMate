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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "INoticeBoardService" in both code and config file together.
    [ServiceContract]
    public interface INoticeBoardService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getNotices?houseID={houseID}")]
        Notice[] getNotices(int houseID);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "addNotice?houseID={houseID}&tenantID={tenantID}&title={title}&message={message}&type={type}")]
        Notice[] addNotice(int houseID, int tenantID, string title, string message, string type);
    }
}
