using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using viper.Models.Identity;
using Newtonsoft.Json;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Hosting;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace viper.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly IHostingEnvironment env;
        public AccountController(IHostingEnvironment env)
        {
            this.env = env;
        }

        [FromServices]
        public UserManager<ApplicationUser> UserManager { get; set; }

        [FromServices]
        public SignInManager<ApplicationUser> SignInManager { get; set; }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var api = new API();
            var response = api.LoginRequest(Request, model.Email, model.Password).Result;
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
    }
}
