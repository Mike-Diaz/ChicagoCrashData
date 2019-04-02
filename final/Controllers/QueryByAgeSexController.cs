using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using final.Models;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity.SqlServer;

namespace final.Controllers
{
    public class QueryByAgeSexController : ApiController
    {
        ChicagoTrafficEntities myEntities = new ChicagoTrafficEntities();

        [HttpGet]
        public object QueryAccidentsByInjury(int ageMin, int ageMax, string sex)
        {
            if (sex == "NULL")
            {
                sex = null;
            }
            List<CrashReportPeople> tempList = new List<CrashReportPeople>();
            
            //get a selection of all the data where injury matches
            var records = from report in myEntities.CrashReportPeoples
                          
                          where report.Sex == sex && (
                              report.Age >= ageMin &&
                              report.Age <= ageMax)
                          select new
                          {
                              Sex = report.Sex,
                              Age = report.Age
                          };

            // add the query items to a list
            foreach (var item in records)
            {
                CrashReportPeople temp = new CrashReportPeople
                {
                    Sex = item.Sex,
                    Age = item.Age
                };
                tempList.Add(temp);
            }

            // create a new query from that set that includes a count of the 
            // occurrences of the injury per the primeCause.
            var returnData = tempList.GroupBy(n => new
            {
                n.Sex,
                n.Age
            }).
                    Select(group => new
                    {
                        Sex = group.Key.Sex,
                        Age = group.Key.Age,
                        NumberAccidents = group.Count()
                    }).OrderByDescending(n => n.NumberAccidents);
            return Json(returnData);
        }

        [HttpPost]
        public IHttpActionResult Save(CrashReport newReport)
        {
            myEntities.CrashReports.Add(newReport);
            myEntities.SaveChanges();
            return Ok();
        }
    }
}