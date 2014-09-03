using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseMateService.Models
{
    [DataContract]
    public class Item
    {
        private string name_;
        private string desc_;
        private string category_;
       // private bool bought_;
       // private bool store_;

        public Item(string name, string desc, string cat)
        {
            name_ = name;
            desc_ = desc;
            category_ = cat;
            //bought_ = bought;
            //store_ = store;
        }

        [DataMember]
        public string name { get { return name_; } set { name_ = value; } }
        [DataMember]
        public string desc { get { return desc_; } set { desc_ = value; } }
        [DataMember]
        public string category { get { return category_; } set { category_ = value; } }
        /*[DataMember]
        public bool bought { get { return bought_; } set { bought_ = value; } }
        [DataMember]
        public bool store { get { return store_; } set { store_ = value; } }*/
    }
}