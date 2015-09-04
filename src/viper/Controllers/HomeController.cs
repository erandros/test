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
        private readonly IHostingEnvironment env;
        public HomeController(IHostingEnvironment env)
        {
            this.env = env;
        }

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
            if (this.env.EnvironmentName != "Development")
                cookieOptions.Secure = true;
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
