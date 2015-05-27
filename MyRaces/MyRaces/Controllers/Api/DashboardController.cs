using System.Web.Http;
using MyRaces.Models;

namespace MyRaces.Controllers.Api
{
    public class DashboardController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetContent()
        {
            var content = new Content()
            {
                Id = 1,
                Title = "My Races Application - Style and Feature Guide",
                SubTitle = "This is a simple application that demonstrates Gulp and the Angular Style Guide Coding Standards",
                ContentTitle1 = "View Your Previous Races",
                ContentDescription1 = "View all the races that you already completed. See your times and placement.",
                ContentTitle2 = "View Your Future Races",
                ContentDescription2 = "View all the races you planned in the future.  See what your goals are.",
                ContentTitle3 = "Make Changes",
                ContentDescription3 = "Modify your previous or future races.",
                
            };
            return Ok(content);
        }
         
    }
}