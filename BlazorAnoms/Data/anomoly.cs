using System;
using System.Collections.Generic;

namespace Anomalies.Model
{
   

    public class Adm
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime ts { get; set; }
    }
   
  

    /*
     * export interface EveHome{
  key: string;
  eveSystems: EveSystem[];
}
export interface EveSystem {
    id: number;
    name: string;
    adms: Adm[];
}

export interface Adm {
    id: number;
    name: string;
    ts: Date;
}

     */
}