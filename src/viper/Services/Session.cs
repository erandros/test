using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viper.Services
{
    public class Session
    {
        private ISession session { get; set; }
        public Session(IHttpContextAccessor accessor)
        {
            session = accessor.HttpContext.Session;
        }
        public string SiteTitle
        {
            get
            {
                if (!session.Keys.Any(key => key == "SiteTitle"))
                    return "Demand";
                return session.GetString("SiteTitle");
            }
            set
            {
                session.SetString("SiteTitle", value);
            }
        }
        public string Token
        {
            get { return session.GetString("Token"); }
            set { session.SetString("Token", value); }
        }
        public string TokenCookie
        {
            get { return "Bearer " + Token; }
        }
    }
}
