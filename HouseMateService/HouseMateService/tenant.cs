//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HouseMateService
{
    using System;
    using System.Collections.Generic;
    
    public partial class tenant
    {
        public tenant()
        {
            this.chore_allocation = new HashSet<chore_allocation>();
            this.individual_bills = new HashSet<individual_bills>();
            this.list_records = new HashSet<list_records>();
            this.notices = new HashSet<notice>();
        }
    
        public int PK_tenantID { get; set; }
        public int FK_houseID { get; set; }
        public int FK_aspMemberID { get; set; }
    
        public virtual ICollection<chore_allocation> chore_allocation { get; set; }
        public virtual house house { get; set; }
        public virtual ICollection<individual_bills> individual_bills { get; set; }
        public virtual ICollection<list_records> list_records { get; set; }
        public virtual ICollection<notice> notices { get; set; }
        public virtual my_aspnet_membership my_aspnet_membership { get; set; }
    }
}
