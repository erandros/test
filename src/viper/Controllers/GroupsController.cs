﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace viper.Controllers
{
    [Authorize]
    public class GroupsController : Controller
    {
        // GET: /<controller>/
        [Route("/groups")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("/groups/{*Id}")]
        public IActionResult Edit(string Id)
        {
            return View("Edit", Id);
        }
    }
}
