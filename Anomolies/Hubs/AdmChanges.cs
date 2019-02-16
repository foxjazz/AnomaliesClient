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

            var repo = _repo;

            var eveHome = repo.ReadDy();
            for (int i = 0; i < eveHome.eveSystems.Count; i++)
            {
                if (eveHome.eveSystems[i].id == system)
                {
                    var adm = new Adm();
                    adm.id = 1;
                    adm.name = name;
                    adm.ts = DateTime.Now;
                    if (eveHome.eveSystems[i].adms == null)
                    {
                        eveHome.eveSystems[i].adms = new List<Adm>();
                    }
                    eveHome.eveSystems[i].adms.Add(adm);
                }
            }
            
            return Clients.All.SendAsync("AddAdm", name, system);
        }
        public Task RemoveAdm(string name, int system)
        {
            
            var repo = _repo;
            var eveHome = repo.ReadDy();
            for (int i = 0; i < eveHome.eveSystems.Count; i++)
            {
                if (eveHome.eveSystems[i].id == system)
                {
                    for (int ii = 0; ii < eveHome.eveSystems[i].adms.Count; ii++)
                    {
                        if (eveHome.eveSystems[i].adms[ii].name == name)
                        {
                                eveHome.eveSystems[i].adms.RemoveAt(ii);
                            
                        }
                    }
                }
            }
            
            return Clients.All.SendAsync("RemoveAdm", name, system);

        }

    }
}
