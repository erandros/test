using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using System.Net.Http;
using viper.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace viper.Controllers
{
    [Route("api/")]
    public class ApiController : Controller
    {
        private API API;
        public ApiController(API api)
        {
            API = api;
        }

        // GET: api/values
        [Route("{*route}")]
        public object Get(string route)
        {
            var response = API.RequestPassThrough(Request, route).Result;
            return response;
        }

    }
}
