﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Microsoft.Framework.Logging.Console;
using Microsoft.Framework.Configuration;
using Microsoft.AspNet.Diagnostics.Entity;
using viper.Models.Identity;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using viper.Services;
using Microsoft.Dnx.Runtime;
using Microsoft.AspNet.Mvc;
using Microsoft.Net.Http.Headers;

namespace viper
{
    public class NoCacheHeaderFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            return;
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.HttpContext.Response != null) // can be null when exception happens
            {
                var headers = context.HttpContext.Response.GetTypedHeaders();
                headers.CacheControl =
                    new CacheControlHeaderValue { NoCache = true, NoStore = true, MustRevalidate = true };
                //if (headers.Headers.Any(header => { header.Value == new string[] { "no-cache" } }))
                if (!headers.Headers.Keys.Any(key => key == "Pragma"))
                    headers.Headers.Add("Pragma", new string[] { "no-cache" });
                if (!headers.Headers.Keys.Any(key => key == "Expires"))
                    headers.Headers.Add("Expires", new string[] { DateTimeOffset.UtcNow.ToString() });
            }
        }
    }

    public class Startup
    {
        public IHostingEnvironment HostingEnv;
        public Startup(IApplicationEnvironment env, IRuntimeEnvironment runtimeEnvironment, IHostingEnvironment hEnv)
        {
            // Setup configuration sources.
            var builder = new ConfigurationBuilder(env.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddJsonFile("env.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            HostingEnv = hEnv;
            var envName = Configuration.GetSection("ASPNET_ENV").Value;
            HostingEnv.EnvironmentName = envName;
        }

        public IConfiguration Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Application settings to the services container.
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // Add MVC services to the services container.
            services.AddMvc();

            services.AddEntityFramework()
                    .AddInMemoryDatabase()
                    .AddDbContext<EmptyContext>(options =>
                        options.UseInMemoryDatabase());

            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<EmptyContext>()
                    .AddDefaultTokenProviders();

            // Uncomment the following line to add Web API services which makes it easier to port Web API 2 controllers.
            // You will also need to add the Microsoft.AspNet.Mvc.WebApiCompatShim package to the 'dependencies' section of project.json.
            // services.AddWebApiConventions();

            services.AddCaching();
            services.AddSession();

            services.AddTransient<Session>();
            services.AddTransient<API>();
            services.AddTransient<Error>();
            services.AddSingleton(s =>
            {
                return Configuration;
            });

            services.ConfigureRouting(routeOptions =>
            {
                routeOptions.LowercaseUrls = true;
            });
        }
        public void ConfigureDevelopment(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(minLevel: LogLevel.Warning);

            app.UseDatabaseErrorPage(DatabaseErrorPageOptions.ShowAll);

            // Add the runtime information page that can be used by developers
            // to see what packages are used by the application
            // default path is: /runtimeinfo
            app.UseRuntimeInfoPage();

            Configure(app);
        }

        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app)
        {
            // StatusCode pages to gracefully handle status codes 400-599.
            app.UseStatusCodePagesWithRedirects("~/Home/StatusCodePage");
            if (!HostingEnv.IsProduction())
            {

                // Display custom error page in production when error occurs
                // During development use the ErrorPage middleware to display error information in the browser
                app.UseErrorPage();

                app.Properties["host.appMode"] = "development";
            }
            else
            {
                app.UseErrorHandler("~/Home/StatusCodePage");
            }
            app.UseSession();

            // Add static files to the request pipeline.
            app.UseStaticFiles();

            // Add cookie-based authentication to the request pipeline
            app.UseIdentity();

            // Add MVC to the request pipeline.
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "login",
                    template: "Login",
                    defaults: new { controller = "Home", action = "Login" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });


                // Uncomment the following line to add a route for porting Web API 2 controllers.
                // routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
            });
        }
    }
}
