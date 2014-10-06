using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Web;

namespace HouseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ShoppingService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ShoppingService.svc or ShoppingService.svc.cs at the Solution Explorer and start debugging.
    public class ShoppingService : IShoppingService
    {
        DAL.ShoppingDAL DAL = new DAL.ShoppingDAL();

        public Item[] getList(int houseID)
        {

            if(HttpContext.Current.Session["loggedIn"].Equals("logged"))
            {
                return DAL.getShoppingList(houseID).ToArray();
            }
            else
            {
                return null;
            }
        }

        public Item[] addItem(int houseID, string name, string desc, string category)
        {
            DAL.addItem(houseID, name, desc, category);
            return getList(houseID);
        }

        public Item[] buyItem(int itemID, int houseID)
        {
            DAL.buyItem(itemID);
            return getList(houseID);
        }

        public string[] getNames(int houseID, string name)
        {
            return removeDoubles(DAL.getNames(houseID, name));
        }

        public string[] getDescs(int houseID, string name)
        {
            return removeDoubles(DAL.getDescs(houseID, name));
        }

        private string[] removeDoubles(string[] arr)
        {
            List<string> newArr = new List<string>();
            for (int i = 0; i < arr.Length; i++)
            {
                bool added = false;
                bool noDoubles = true;
                foreach(string s in newArr)
                {
                    if(s.Equals(arr[i]))
                    {
                        noDoubles = false;
                    }
                }
                if(noDoubles)
                {
                    newArr.Add(arr[i]);
                }
            }
            return newArr.ToArray();
        }
    }
}
