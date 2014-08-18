using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.Common;
using MySql.Data.MySqlClient;

namespace DAL
{
    public class testDAL
    {

        public string getData(int houseID)
        {
            try
            {
                string result = "something else";
                string conStr = @"server=houseMate.db.12005856.hostedresource.com; Uid=houseMate;database=houseMate; Pwd= M!cr0s0ft";
                MySqlConnection conn = new MySqlConnection(conStr);
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT houseName FROM house WHERE PK_houseId = " + houseID;

                conn.Open();


                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    result = reader.GetString(reader.GetOrdinal("houseName"));
                }

                return result;
            }
            catch
            {
                return "sql didn't work";
            }
        }

    }
}