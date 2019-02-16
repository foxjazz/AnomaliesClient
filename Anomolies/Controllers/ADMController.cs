using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anomalies.Services;
using Microsoft.AspNetCore.Mvc;

namespace Anomalies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmController : Controller
    {
        private Repo _repo;
        public AdmController(Repo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public string Get()
        {

            return _repo.Read();
        }
        [HttpPost]
        public void Post([FromBody] dynamic eveHome)
        {
            try
            {
                //if (eveHome.key != "evePower")
                //    return;
                string val = eveHome.ToString();
                if (val.Length > 100000)
                    return;
                if (val.IndexOf("5XR-KZ") > 0)
                {
                    _repo.Save(val, eveHome);
                }
            }
            catch
            {
                return;
            }
        }
    }
}