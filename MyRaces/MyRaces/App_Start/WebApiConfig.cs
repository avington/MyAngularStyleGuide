using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace MyRaces
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new {id = RouteParameter.Optional}
                );

            //Camel case the JSon formatter
            var jsonFormatter = config.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            //enable CORS accross all domains
            var cors = new EnableCorsAttribute("*", "*","*");
            config.EnableCors(cors);
        }
    }
}