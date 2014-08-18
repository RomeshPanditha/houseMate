using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data;
using MySql.Data.Common;
using MySql.Data.MySqlClient;

namespace houseMateService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public string GetData()
        {
            string result = "error";
            string conStr = "server=houseMate.db.12005856.hostedresource.com;user id=houseMate;database=houseMate";
            MySqlConnection conn = new MySqlConnection(conStr);
            MySqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT houseName FROM house WHERE PK_houseId = 2";

            conn.Open();
            

            using (MySqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    result = reader.GetString(reader.GetOrdinal("houseName"));
                }
            }

            return result;
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}
