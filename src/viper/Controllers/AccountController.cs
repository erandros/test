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
using viper.Services;
using Microsoft.AspNet.Http.Authentication;

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
        private Session Session;
        private API API;

        public AccountController(IHostingEnvironment env, Session Session, API api)
        {
            this.env = env;
            this.Session = Session;
            this.API = api;
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
            var response = API.LoginRequest(Request, model.Email, model.Password);
            if (response.IsOK)
            {
                dynamic json = response.Json;
                Session.Token = json.access_token.Value;
                var user = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    UserName = model.Email
                };
                await SignInManager.SignInAsync(user, new AuthenticationProperties()
                {
                    IsPersistent = false,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(1)
                });
                Session.SiteTitle = API.GetTitle();
                if (string.IsNullOrEmpty(returnUrl))
                    return RedirectToAction("Index", "Dashboard");
                else return RedirectToLocal(returnUrl);
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

        #region Helpers

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        #endregion
    }
}
