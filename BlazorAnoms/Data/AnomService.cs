using System;
using Anomalies.Model;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;

//using Newtonsoft.Json;

namespace BlazorAnoms.Data
{
    public class AnomService
    {
        private static readonly HttpClient client = new HttpClient();
        public Task<EveHome> GetAnoms()
        {
            

           
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //var streamTask = client.GetStreamAsync();
            Task<EveHome> task = Task.Run(async () => await GetData());
            task.Wait();
            return Task.FromResult(task.Result);
        }


        public async Task<EveHome> GetData()
        {
            var serializer = new DataContractJsonSerializer(typeof(EveHome));
            string uri = @"http://localhost:5010/api/adm";
            // var response = client.GetAsync(url);
            EveHome eveHome;
            try
            {
                eveHome = null;
                // string data ="{\"key\":\"key\",\"eveSystems\":[{\"id\":1,\"name\":\"5XR-KZ\",\"adms\":[]},{\"id\":2,\"name\":\"75C-WN\",\"adms\":[]},{\"id\":3,\"name\":\"BG-W90\",\"adms\":[]},{\"id\":4,\"name\":\"C-0ND2\",\"adms\":[]},{\"id\":5,\"name\":\"I5Q2-S\",\"adms\":[]},{\"id\":6,\"name\":\"JI-LGM\",\"adms\":[]},{\"id\":7,\"name\":\"OCU4-R\",\"adms\":[]},{\"id\":8,\"name\":\"PO-3QW\",\"adms\":[]},{\"id\":9,\"name\":\"VF-FN6\",\"adms\":[]},{\"id\":10,\"name\":\"Y-YGMW\",\"adms\":[]},{\"id\":12,\"name\":\"Z-PNIA\",\"adms\":[]}]}";
                //string stuff  = Regex.Unescape(data);
                //eveHome = JsonConvert.DeserializeObject<EveHome>(stuff);
                HttpResponseMessage response = await client.GetAsync(uri);
                string result = await response.Content.ReadAsStringAsync();
                //string esc1 = data.Replace(@"\", "");
                string so = result.Substring(1, result.Length - 2);
                string esc1 = so.Replace(@"\", "");

                
              
                eveHome = JsonConvert.DeserializeObject<EveHome>(esc1);

            }
            catch (Exception ex)
            {
                eveHome = null;
                var s = ex.Message;
            }



            return eveHome;
        }
    }

    
}
