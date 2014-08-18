using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BL
{
    public class testBL
    {
        DAL.testDAL dal = new DAL.testDAL();

        public string getData(int houseID)
        {
            return dal.getData(houseID);
        }

    }
}