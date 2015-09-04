using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNet.Http;

namespace viper.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            ViewBag.Message = "Login Page";
            return View();
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            var api = new API();
            var response = api.LoginRequest(Request, username, password).Result;
            var result = response.Content.ReadAsStringAsync().Result;
            dynamic data = JsonConvert.DeserializeObject(result);
            var cookie = "Bearer " + data.access_token.Value;
            var cookieOptions = new CookieOptions() { HttpOnly = true, Expires = DateTime.Now.AddDays(1) };
            Response.Cookies.Append("Authorization", cookie, cookieOptions);
            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                return View();
            }
            else return RedirectToAction("Index", "Dashboard");
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
