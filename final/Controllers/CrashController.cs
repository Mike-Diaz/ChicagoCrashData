using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using final.Models;

using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace final.Controllers
{
    public class CrashController : ApiController
    {
        ChicagoTrafficEntities myEntities = new ChicagoTrafficEntities();

        [HttpGet]
        public object QueryAccidentsByInjury(string selectedInjury)
        {
            List<CrashReport> tempList = new List<CrashReport>();

            //get a selection of all the data where injury matches
            var records = from report in myEntities.CrashReports
                          where report.MostSevereInjury == selectedInjury
                          select new
                          {
                              PrimeContributingCause = report.PrimeContributingCause,
                          };

            // add the query items to a list
            foreach (var item in records)
            {
                CrashReport temp = new CrashReport
                {
                    PrimeContributingCause = item.PrimeContributingCause
                };
                tempList.Add(temp);
            }

            // create a new query from that set that includes a count of the 
            // occurrences of the injury per the primeCause.
            var returnData = tempList.GroupBy(n => n.PrimeContributingCause).
                    Select(group =>
                        new
                        {
                            PrimeContributingCause = group.Key,
                            NumberInjuries = group.Count()
                        }).OrderByDescending(n => n.NumberInjuries);

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
