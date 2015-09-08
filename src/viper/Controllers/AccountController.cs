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
        [FromServices]
        public UserManager<ApplicationUser> UserManager { get; set; }
        [FromServices]
        public SignInManager<ApplicationUser> SignInManager { get; set; }
        private readonly IHostingEnvironment env;

        public AccountController(IHostingEnvironment env)
        {
            this.env = env;
        }
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
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                dynamic data = JsonConvert.DeserializeObject(result);
                var cookie = "Bearer " + data.access_token.Value;
                var cookieOptions = new CookieOptions() { HttpOnly = true, Expires = DateTime.Now.AddDays(1) };
                if (this.env.EnvironmentName != "Development")
                    cookieOptions.Secure = true;
                Response.Cookies.Append("Authorization", cookie, cookieOptions);
                var user = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    UserName = model.Email
                };
                await SignInManager.SignInAsync(user, model.RememberMe);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError("", "Invalid login attempt.");
                return View(model);
            }
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> LogOff()
        {
            await SignInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
