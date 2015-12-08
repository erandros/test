using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Hosting;

namespace viper.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }

        public IActionResult StatusCodePage()
        {
            Response.StatusCode = 404;
            return View("~/Views/Shared/StatusCodePage.cshtml");
        }
    }
}
