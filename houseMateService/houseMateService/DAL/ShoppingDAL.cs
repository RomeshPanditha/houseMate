using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class ShoppingDAL
    {
        

        public ShoppingDAL()
        {
           
        }

        public List<Item> getShoppingList(int houseID)
        {
            List<Item> shoppingList = new List<Item>();
            
            using(var context = new houseMateEntities())
            {
                int listID = Convert.ToInt32((from list in context.lists
                                     where  list.FK_houseID == houseID
                                     select list.PK_listID).Single());

                if (listID != 0)
                {
                    List<item> itemz = context.items.ToList<item>();
                    foreach (item i in itemz)
                    {
                        if (i.FK_listID == listID && i.bought_ == 0)
                        {
                            shoppingList.Add(new Item(i.name.ToString(), i.description.ToString(), i.category.ToString()));
                        }
                    }
                }
            }   
            return shoppingList;
        }

        public void addItem(int houseID)
        {
            using (var context = new houseMateEntities())
            {
                int listID = Convert.ToInt32((from list in context.lists
                                      where list.FK_houseID == houseID
                                      select list.PK_listID).Single());


            }
        }
    }
}