using System.Net.Http;
using System;
using System.Collections.Generic;
using api.Models.Payments;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PayPal.Api;
using WebApi.Helpers;
using AppContext = WebApi.Helpers.AppContext;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WebApi.Services
{
    public interface IPaymentService
    {
        Task<DepositRes> DepositFunds(DepositReq model);
    }
    public class PaymentService : IPaymentService
    {
        private readonly AppSettings _appSettings;
        private readonly AppContext _context;

        public PaymentService(IOptions<AppSettings> appSettings, AppContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }
        
        public async Task<DepositRes> DepositFunds(DepositReq model)
        {
            var accessTokenRes = await GetAccessToken();
            var data = JObject.Parse(accessTokenRes);
            var access_token = data["access_token"].Value<string>();

            var orderRes = await MakeOrder(access_token, model);

            return new DepositRes
            {
                Status = "OK"
            };
        }

        private async Task<string> GetAccessToken ()
        {
            var dict  = new Dictionary<string, string>();
            dict.Add("grant_type", "client_credentials");
            using (var client = new HttpClient())
            {
                var username = Environment.GetEnvironmentVariable("PAYPAL_APP_USERNAME");
                var password = Environment.GetEnvironmentVariable("PAYPAL_APP_PASSWORD");

                String encoded = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(username + ":" + password));

                var req = new HttpRequestMessage(HttpMethod.Post, "https://api-m.sandbox.paypal.com/v1/oauth2/token") { Content = new FormUrlEncodedContent(dict) };
                req.Headers.Authorization = new AuthenticationHeaderValue("Basic", encoded);

                var response = await client.SendAsync(req);

                return response.Content.ReadAsStringAsync().Result;
            }
        }

        private async Task<HttpResponseMessage> MakeOrder(string token, DepositReq model)
        {
            using (var client = new HttpClient())
            {
                var content = new PaypalOrder(model);
                var json = JsonConvert.SerializeObject(content);
                var req = new HttpRequestMessage(HttpMethod.Post, "https://api-m.sandbox.paypal.com/v2/checkout/orders")
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json")
                };
                req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await client.SendAsync(req);

                return response;
            }
        }
    }
}