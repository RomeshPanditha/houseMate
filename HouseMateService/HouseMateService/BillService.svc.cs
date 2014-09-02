using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BillService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select BillService.svc or BillService.svc.cs at the Solution Explorer and start debugging.
    public class BillService : IBillService
    {
        private BillsDAL DAL = new BillsDAL();

        public void DoWork()
        {
        }


    }
}
