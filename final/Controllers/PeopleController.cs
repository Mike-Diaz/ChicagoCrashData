using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using final.Models;

namespace final.Controllers
{
    public class PeopleController : ApiController
    {
        ChicagoTrafficEntities myEntities = new ChicagoTrafficEntities();

        public object GetAllPeopleReports()
        {
            var records = from entity in myEntities.CrashReportPeoples
                          select new
                          {
                              PersonID = entity.PersonID,
                              RD_NO = entity.RD_NO,
                              PersonType = entity.PersonType,
                              Age = entity.Age,
                              Sex= entity.Sex
                          };
            return Json(records);
        }

        [HttpPost]
        public IHttpActionResult Save(CrashReport newReportPerson)
        {
            myEntities.CrashReports.Add(newReportPerson);
            myEntities.SaveChanges();
            return Ok();
        }
    }
}
