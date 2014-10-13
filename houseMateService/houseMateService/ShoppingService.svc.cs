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
            if(Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
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
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.addItem(houseID, name, desc, category);
                return getList(houseID);
            }
            else
            {
                return null;
            }
        }

        public Item[] buyItem(int itemID, int houseID)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                DAL.buyItem(itemID);
                return getList(houseID);
            }
            else
            {
                return null;
            }
        }

        public string[] getNames(int houseID, string name)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return removeDoubles(DAL.getNames(houseID, name));
            }
            else
            {
                return null;
            }
        }

        public string[] getDescs(int houseID, string name)
        {
            if (Convert.ToInt32(HttpContext.Current.Session["loggedIn"]) >= 0)
            {
                return removeDoubles(DAL.getDescs(houseID, name));
            }
            else
            {
                return null;
            }
        }

        private string[] removeDoubles(string[] arr)
        {
            List<string> newArr = new List<string>();
            for (int i = 0; i < arr.Length; i++)
            {
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
