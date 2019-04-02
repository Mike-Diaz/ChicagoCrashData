using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace final
{
    public static class WebApiConfig
    {
        // THE ISSUE MAY BE HERE - BRET
        // ONLY ROUTES CONFIG'ed that the controller listsns to are here.
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            // THIS IS THE DEFAULT ROUTE CONFIG
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                name: "QueryAccidentsByInjury",
                routeTemplate: "api/{controller}/{selectedInjury}",
                defaults: new { selectedInjury = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "QueryAccidentsByCause",
                routeTemplate: "api/{controller}/{selectedCause}/{placeholder}",
                defaults: new { selectedCause = RouteParameter.Optional, placeholder = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "QueryAccidentsByAgeSex",
                routeTemplate: "api/{controller}/{ageMin}/{ageMax}/{sex}",
                defaults: new
                {
                    ageMin = RouteParameter.Optional,
                    ageMax = RouteParameter.Optional,
                    sex = RouteParameter.Optional
                }
            );
        }
    }
}
