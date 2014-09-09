﻿using HouseMateService.Models;
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
                int listID = getListID(houseID);

                if (listID != 0)
                {
                    List<item> itemList = new List<item>();

                    var itemVar = from item in context.items
                                  where item.FK_listID == listID && item.bought_ == 0
                                  select item;

                    itemList.AddRange(itemVar);

                    foreach (item i in itemList)
                    {
                        shoppingList.Add(new Item(i.name.ToString(), i.description.ToString(), i.category.ToString()));
                    }
                }
            }   
            return shoppingList;
        }

        /*
        public List<ItemName> getNames(int houseID, string partialName)
        {
            List<ItemName> nameList = new List<ItemName>();
            using (var context = new houseMateEntities())
            {
                int listID = getListID(houseID);

                List<item> itemList = new List<item>();
                var items = from item in context.items
                              where item.FK_listID == listID
                              select item;
                itemList.AddRange(items);
                foreach (item i in itemList)
                {
                    nameList.Add(new ItemName(i.name, i.PK_itemID));  
                }
            }
            return nameList;
        } */


        public string[] getNames(int houseID, string nameFragment)
        {
            using (var context = new houseMateEntities())
            {
                int listID = getListID(houseID);
                
                string[] names = (from item in context.items
                                    where item.FK_listID == listID && item.name.ToLower().Contains(nameFragment.ToLower())
                                    select item.name).ToArray();
                return names;
            }
        }

        public string[] getDescs(int houseID, string nameFragment)
        {
            using (var context = new houseMateEntities())
            {
                int listID = getListID(houseID);
                
                string[] descs = (from item in context.items
                                    where item.FK_listID == listID && item.name.ToLower().Equals(nameFragment.ToLower())
                                    select item.description).ToArray();
                return descs;
            }
        }

        private int getListID(int houseID)
        {
            using (var context = new houseMateEntities())
            {
                return Convert.ToInt32((from list in context.lists
                                              where list.FK_houseID == houseID
                                              select list.PK_listID).Single());
            }
        }

        public void addItem(int houseID, string name_, string desc_, string category_)
        {
            using (var context = new houseMateEntities())
            {
                int listID = getListID(houseID);
                bool added = false;

                item newItem = new item
                {
                    FK_listID = listID,
                    name = name_,
                    category = category_,
                    bought_ = 0,
                    description = desc_
                };
                var itemArr = from item in context.items
                                 where item.FK_listID == listID
                                 select item;
                List<item> itemList = new List<item>();
                itemList.AddRange(itemArr);

                foreach (item i in itemList)
                {
                    if (!added)
                    {
                        if (i.name.ToLower().Equals(newItem.name.ToLower()) && i.description.ToLower().Equals(newItem.description.ToLower()))
                        {
                            i.bought_ = 1;
                            added = true;
                        }
                    }
                }

                if (!added)
                {
                    context.items.Add(newItem);
                    context.SaveChanges();
                }
            }
        }
    }
}