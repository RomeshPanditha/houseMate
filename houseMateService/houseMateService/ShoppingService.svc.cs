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
            /*List<Item> myList = new List<Item>();
            myList.Add(new Item("Milk", "Low Fat", "food", false, false));
            myList.Add(new Item("Bread", "Multigrain", "food", false, false));
            myList.Add(new Item("ClingWrap", "any", "util", false, false));*/
            return DAL.getShoppingList(houseID).ToArray();
        }


        public string getThing()
        {
            return "This String";
        }
    }
}
