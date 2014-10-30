using HouseMateService.DAL;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService
{
    public class SomeJob : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            try
            {
                new ChoresDAL().addChore(1, "lol");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}