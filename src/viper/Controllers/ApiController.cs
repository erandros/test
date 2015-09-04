using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace viper.Controllers
{
    [Route("api/")]
    public class ApiController : Controller
    {
        // GET: api/values
        [Route(@"{route:regex(\S+)}")]
        public object Get(string route)
        {
            var api = new API();
            var response = api.Request(Request, route).Result;
            return response;
        }

    }
}
