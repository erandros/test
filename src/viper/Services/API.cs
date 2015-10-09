﻿using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace viper.Services
{
    public class API
    {
        private const string BaseRoute = "https://viper.fitmentgroup.com/";
        private const string BaseApiRoute = BaseRoute + "api";
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

        public HttpClient AuthorizedClient(HttpRequest Request)
        {
            var req = new HttpClient();
            var token = Request.Cookies["Authorization"];
            req.DefaultRequestHeaders.Add("Authorization", token);
            return req;
        }

        public async Task<object> RequestPassThrough(HttpRequest Current, string route)
        {
            var client = AuthorizedClient(Current);
            var response = await client.SendAsync(new HttpRequestMessage(
                method: new HttpMethod(Current.Method),
                requestUri: BaseRoute + "api/" + route));
            return response.Content.ReadAsStringAsync().Result;
        }

        public async Task<HttpResponseMessage> Request(HttpRequest Current, string url, object data = null, string method = "GET")
        {
            var client = AuthorizedClient(Current);
            var response = await client.SendAsync(new HttpRequestMessage(
                method: new HttpMethod(method),
                requestUri: BaseApiRoute + url
            ));
            return response;
        }

        public string GetTitle(HttpRequest Current)
        {
            var response = Request(Current, "/user/applications");
            var json = response.Result.Content.ReadAsStringAsync().Result;
            dynamic apps = JsonConvert.DeserializeObject(json);
            foreach(var app in apps)
            {
                bool isDefault = app.IsDefault;
                if (isDefault) return app.Title.Value; 
            }
            throw new Exception("User doesn't have a default application");
        }
    }
}
