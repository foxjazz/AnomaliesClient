using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anomalies.Model;
using Anomalies.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Anomalies.Hubs
{

    //  [HubName("admchanges")]
    public class AdmChanges : Hub
    {
        private Repo _repo;
        public AdmChanges(Repo repo)
        {
            _repo = repo;
        }
        public Task AddAdm( string name, int system)
        {

            _repo.Add(name,system);
            return Clients.All.SendAsync("AddAdm", name, system);
        }

        public Task RemoveAdm(string name, int system)
        {
            
        _repo.Remove(name,system);
        return Clients.All.SendAsync("RemoveAdm", name, system);

        }

        public Task ClearData(bool b)
        {
            return Clients.All.SendAsync("ClearData", b);
        }

    }
}
