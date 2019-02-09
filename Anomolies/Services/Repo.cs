using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;



namespace Anomalies.Services
{
    public class Repo
    {
        private string data { get; set; }
        private dynamic eveHome { get; set; }
        public string Read()
        {
            return data;
        }

        public void Save(string d)
        {
            data = d;
        }
        public void Save(string d, dynamic dy)
        {
            data = d;
            eveHome = dy;
            
        }

        public dynamic ReadDy()
        {
            return eveHome;
        }

     
    }
}
