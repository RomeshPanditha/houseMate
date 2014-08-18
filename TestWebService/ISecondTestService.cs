using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using TestWebService.Model;

namespace TestWebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ISecondTestService" in both code and config file together.
    [ServiceContract]
    public interface ISecondTestService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetDogs")]
        List<Dog> getDogs();
    }


    
}
