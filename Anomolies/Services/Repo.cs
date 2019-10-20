using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anomalies.Model;
using Microsoft.AspNetCore.Mvc.DataAnnotations.Internal;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;


namespace Anomalies.Services
{
    public sealed class Repo
    {
        public Repo()
        {
            eveHome = new EveHome();
            eveSystems = new List<EveSystem>();
            eveHome.eveSystems = eveSystems;
        }

        private EveHome eveHome { get; set; }
        private List<EveSystem> eveSystems;
        public string Read()
        {
            if (eveHome.key == null)
                eveHome.key = "key";
            return JsonConvert.SerializeObject(eveHome);
        }

        public void Remove(string name, int system)
        {
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
        }
        public void Add(string name, int system)
        {
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
        }
        public void Save(string d, dynamic dy)
        {
            dynamic data = dy;
            eveHome.eveSystems = new List<EveSystem>();
            eveSystems = eveHome.eveSystems;
            for (int i = 0; i < data.eveSystems.Count; i++)
            {
                var ds = new EveSystem();
                ds.name = data.eveSystems[i].name;
                ds.id = data.eveSystems[i].id;
                ds.adms = new List<Adm>();
                var adml = new List<Adm>();
                for (int ii = 0; ii < data.eveSystems[i].adms.Count; ii++)
                {
                    var adm = new Adm();
                    adm.name = data.eveSystems[i].adms[ii].name;
                    adm.id = data.eveSystems[i].adms[ii].id;
                    adml.Add(adm);
                }
                eveSystems.Add(ds);
            }
        }

        public EveHome ReadDy()
        {
            return eveHome;
        }

     
    }
}
