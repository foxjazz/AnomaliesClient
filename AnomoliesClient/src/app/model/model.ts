
export interface EveHome{
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

