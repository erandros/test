using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace viper.Services
{
    public class Response
    {
        public Task<HttpResponseMessage> Task;
        public Response(Task<HttpResponseMessage> task)
        {
            Task = task;
        }

        public bool IsOK
        {
            get { return Task.Result.StatusCode == System.Net.HttpStatusCode.OK; }
        }

        public dynamic Json
        {
            get
            {
                var json = Task.Result.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject(json);
            }
        }
    }

    public class API
    {
        private string BaseRoute;
        private string BaseApiRoute { get { return BaseRoute + "api"; } }
        public Session Session;
        public Error Error;
        public API(Session session, Error error, IHostingEnvironment env)
        {
            Session = session;
            Error = error;
            if (env.IsProduction())
            {
                BaseRoute = "https://api.fitmentgroup.com/";
            }
            else
            {
                BaseRoute = "https://apitest.fitmentgroup.com/";
            }
        }

        public async Task<HttpResponseMessage> LoginRequest(HttpRequest Request, string username, string password)
        {
            var req = new HttpClient();
            List<KeyValuePair<string, string>> kvpList = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", username),
                new KeyValuePair<string, string>("password", password),
            };
            var content = new FormUrlEncodedContent(kvpList);
            var response = await req.PostAsync(
                requestUri: BaseRoute + "Token",
                content: content);
            return response;
        }

        /// <summary>
        /// Returns an HttpClient with the token cookie set
        /// </summary>
        private HttpClient AuthorizedClient()
        {
            var req = new HttpClient();
            req.DefaultRequestHeaders.Add("Authorization", Session.TokenCookie);
            return req;
        }

        /// <summary>
        /// This is only used once in ApiController to reroute an /api/ call coming from the browser to viper api
        /// </summary>
        public async Task<object> RequestPassThrough(HttpRequest Current, string route)
        {
            var client = AuthorizedClient();
            var response = await client.SendAsync(new HttpRequestMessage(
                method: new HttpMethod(Current.Method),
                requestUri: BaseRoute + "api/" + route));
            return response.Content.ReadAsStringAsync().Result;
        }

        /// <summary>
        /// Use this method to call the viper api from here (the web server)
        /// </summary>
        public Response Request(string url, object data = null, string method = "GET")
        {
            var client = AuthorizedClient();
            var _response = client.SendAsync(new HttpRequestMessage(
                method: new HttpMethod(method),
                requestUri: BaseApiRoute + url
            ));
            var response = new Response(_response);
            if (!response.IsOK)
            {
                Error.Report("Request returned with status different than 200", "API");
            }
            return response;
        }

        /// <summary>
        /// Return the title of the current user's default application
        /// </summary>
        public string GetTitle()
        {
            var response = Request("/application/applications");
            if (response.IsOK)
            {
                dynamic apps = response.Json;
                foreach (var app in apps)
                {
                    bool isDefault = app.IsDefault;
                    if (isDefault) return app.Title.Value;
                }
                Error.Report("User doesn't have a default site", "API");
            }
            return "Viper";
        }
    }
}
