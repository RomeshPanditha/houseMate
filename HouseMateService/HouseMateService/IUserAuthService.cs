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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IUserAuthService" in both code and config file together.
    [ServiceContract]
    public interface IUserAuthService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "createUser?username={username}&password={password}&email={email}")]
        UserCreated createUser(string username, string password, string email);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "login?username={username}&password={password}")]
        UserAuth login(string username, string password);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "logout")]
        void logout();

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
         ResponseFormat = WebMessageFormat.Json, UriTemplate = "getTenant?tid={tid}")]
        string GetTenant(int tid);
    }
}
