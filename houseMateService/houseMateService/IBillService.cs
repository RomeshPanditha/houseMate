﻿using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IBillService" in both code and config file together.
    [ServiceContract]
    public interface IBillService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getBills?houseID={houseID}")]
        Bill[] getBills(int houseID);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "getIndividuals?billID={billID}")]
        tenantBill[] getIndividuals(int billID);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json, UriTemplate = "addBill?houseID={houseID}&billType={billType}&amount={amount}&tenantIDs={tenantIDs}&tenantAmounts={tenantAmounts}")]
        Bill[] addBill(int houseID, string billType, double amount, string tenantIDs, string tenantAmounts);
    }
}
