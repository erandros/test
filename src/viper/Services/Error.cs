using Microsoft.AspNet.Hosting;
using Microsoft.Framework.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viper.Services
{
    public class Error
    {
        public IHostingEnvironment Env;
        public ILogger Logger;
        public Error(IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            Env = env;
            Logger = loggerFactory.CreateLogger("");
        }

        public void Report(string msg, string context = "")
        {
            Report(new Exception(msg), context);
        }

        public void Report(Exception e, string context = "")
        {
            if (Env.IsDevelopment())
            {
                try { throw e; } catch(Exception ex) { Logger.LogError(context, ex); }
            }
            else //staging and production
            {
                throw e;
            }
        }
    }
}
