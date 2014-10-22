using HouseMateService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseMateService.DAL
{
    public class NoticeDAL
    {

        public List<Notice> GetNotices(int houseID)
        {
            List<Notice> noticeList = new List<Notice>();
            using (var context = new houseMateEntities01())
            {
                List<notice> nList = new List<notice>();
                nList.AddRange(from n in context.notices
                                where n.notice_board.FK_houseID == houseID && n.tenant.isCurrent == 0
                                select n);
                nList.Reverse();
                foreach (notice n in nList)
                {
                    string name = n.tenant.my_aspnet_membership.Email;

                    noticeList.Add(new Notice(n.PK_noticeID, n.title, n.message, n.datePosted, name, n.type));
                }
            }

            return noticeList;
        }

        public void addNotice(int houseID, int tenantID, string title_, string message_, string type_)
        {
            using (var context = new houseMateEntities01())
            {
                var nBID = (from n in context.notice_board
                            where n.FK_houseID == houseID
                            select n.PK_noticeBoardID).Single();
                int nBoardID = nBID;

                notice newNotice = new notice
                {
                    FK_noticeBoardID = nBoardID,
                    FK_tenantID = tenantID,
                    title = title_,
                    message = message_,
                    datePosted = DateTime.Now,
                    type = type_
                };
                context.notices.Add(newNotice);
                context.SaveChanges();
            }
        }

    }
}