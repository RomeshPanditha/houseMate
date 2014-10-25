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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IChoreService" in both code and config file together.
    [ServiceContract]
    public interface IChoreService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "addChore?hid={hid}&cName={cName}")]
        void addChore(int hid, string cName);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "allocateChore?hid={hid}&cName={cName}&tID={tID}&dow={dow}&cyc={cyc}")]
        void allocateChore(int hid, string cName, int tID, string dow, int cyc);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getChores?hid={hid}")]
        Chore[] getChores(int hid);


    }
}
