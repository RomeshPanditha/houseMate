//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestWebService
{
    using System;
    using System.Collections.Generic;
    
    public partial class notice
    {
        public int PK_noticeID { get; set; }
        public int FK_noticeBoardID { get; set; }
        public int FK_tenantID { get; set; }
        public string title { get; set; }
        public string message { get; set; }
        public System.DateTime datePosted { get; set; }
        public string type { get; set; }
    
        public virtual notice_board notice_board { get; set; }
        public virtual tenant tenant { get; set; }
    }
}