using System.Web.Mvc;

namespace MyRaces.Controllers.Web
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
