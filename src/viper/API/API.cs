using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace viper
{
    public class API
    {
        private const string BaseRoute = "https://api.fitmentgroup.com/";
        public API()
        {
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

        public async Task<object> Request(HttpRequest Request, string route)
        {
            var req = new HttpClient();
            var token = Request.Cookies["Authorization"];
            req.DefaultRequestHeaders.Add("Authorization", token);
            var response = await req.SendAsync(new HttpRequestMessage(
                method: new HttpMethod(Request.Method),
                requestUri: BaseRoute + "api/" + route));
            return response.Content.ReadAsStringAsync().Result;
        }
    }
}
