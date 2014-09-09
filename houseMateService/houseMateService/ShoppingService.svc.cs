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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ShoppingService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ShoppingService.svc or ShoppingService.svc.cs at the Solution Explorer and start debugging.
    public class ShoppingService : IShoppingService
    {
        DAL.ShoppingDAL DAL = new DAL.ShoppingDAL();


        public Item[] getList(int houseID)
        {
            return DAL.getShoppingList(houseID).ToArray();
        }

        public Item[] addItem(int houseID, string name, string desc, string category)
        {
            DAL.addItem(houseID, name, desc, category);
            return getList(houseID);
        }

        /*
        public ItemName[] getNames(int houseID, string name)
        {
            return DAL.getNames(houseID, name).ToArray();
        } */

        public string[] getNames(int houseID, string name)
        {
            return DAL.getNames(houseID, name);
        }

        public string[] getDescs(int houseID, string name)
        {
            return DAL.getDescs(houseID, name);
        }
    }
}
