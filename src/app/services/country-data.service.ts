import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  regions: any = {
    "BOUCLE DU MOUHOUN": [
      "BALE",
      "BANWA",
      "KOSSI",
      "MOUHOUN",
      "NAYALA",
      "SOUROU"
    ],
    "CASCADES": [
      "COMOE",
      "LERABA"
    ],
    "CENTRE": [
      "KADIOGO"
    ],
    "CENTRE-EST": [
      "BOULGOU",
      "KOULPELOGO",
      "KOURITENGA"
    ],
    "CENTRE-NORD": [
      "BAM",
      "NAMENTENGA",
      "SANMATENGA"
    ],
    "CENTRE-OUEST": [
      "BOULKIEMDE",
      "SANGUIE",
      "SISSILI",
      "ZIRO"
    ],
    "CENTRE-SUD": [
      "BAZEGA",
      "NAHOURI",
      "ZOUNDWEOGO"
    ],
    "EST": [
      "GNAGNA",
      "GOURMA",
      "KOMANDJARI",
      "KOMPIENGA",
      "TAPOA"
    ],
    "HAUTS-BASSINS": [
      "HOUET",
      "KENEDOUGOU",
      "TUY"
    ],
    "NORD": [
      "LOROUM",
      "PASSORE",
      "YATENGA",
      "ZONDOMA"
    ],
    "PLATEAU CENTRAL": [
      "GANZOURGOU",
      "KOURWEOGO",
      "OUBRITENGA"
    ],
    "SAHEL": [
      "OUDALAN",
      "SENO",
      "SOUM",
      "YAGHA"
    ],
    "SUD-OUEST": [
      "BOUGOURIBA",
      "IOBA",
      "NOUMBIEL",
      "PONI"
    ]
  };

  provinces: any = {
    "BALE": "0101",
    "BANWA": "0102",
    "KOSSI": "0103",
    "MOUHOUN": "0104",
    "NAYALA": "0105",
    "SOUROU": "0106",
    "COMOE": "0201",
    "LERABA": "0202",
    "KADIOGO": "0301",
    "BOULGOU": "0401",
    "KOULPELOGO": "0402",
    "KOURITENGA": "0403",
    "BAM": "0501",
    "NAMENTENGA": "0502",
    "SANMATENGA": "0503",
    "BOULKIEMDE": "0601",
    "SANGUIE": "0602",
    "SISSILI": "0603",
    "ZIRO": "0604",
    "BAZEGA": "0701",
    "NAHOURI": "0702",
    "ZOUNDWEOGO": "0703",
    "GNAGNA": "0801",
    "GOURMA": "0802",
    "KOMANDJARI": "0803",
    "KOMPIENGA": "0804",
    "TAPOA": "0805",
    "HOUET": "0901",
    "KENEDOUGOU": "0902",
    "TUY": "0903",
    "LOROUM": "1001",
    "PASSORE": "1002",
    "YATENGA": "1003",
    "ZONDOMA": "1004",
    "GANZOURGOU": "1101",
    "KOURWEOGO": "1102",
    "OUBRITENGA": "1103",
    "OUDALAN": "1201",
    "SENO": "1202",
    "SOUM": "1203",
    "YAGHA": "1204",
    "BOUGOURIBA": "1301",
    "IOBA": "1302",
    "NOUMBIEL": "1303",
    "PONI": "1304"
  }

  communes: any = {
    "0101": ["BAGASSI", "BANA", "BOROMO", "FARA", "OURY", "PA", "POMPOI", "POURA", "SIBY", "YAHO"],
    "0102": ["BALAVE", "KOUKA", "SAMI", "SANABA", "SOLENZO", "TANSILA"],
    "0103": ["BARANI", "BOMBOROKUY", "BOURASSO", "DJIBASSO", "DOKUY", "DOUMBALA", "KOMBORI", "MADOUBA", "NOUNA", "SONO"],
    "0104": ["BONDOKUY", "DEDOUGOU", "DOUROULA", "KONA", "OUARKOYE", "SAFANE", "TCHERIBA"],
    "0105": ["GASSAN", "GOSSINA", "KOUGNY", "TOMA", "YABA", "YE"],
    "0106": ["DI", "GOMBORO", "KASSOUM", "KIEMBARA", "LANFIERA", "LANKOUE", "TOENI", "TOUGAN"],
    "0201": ["BANFORA", "BEREGADOUGOU", "MANGODARA", "MOUSSODOUGOU", "NIANGOLOKO", "OUO", "SIDERADOUGOU", "SOUBAKANIEDOUGOU", "TIEFORA"],
    "0202": ["DAKORO", "DOUNA", "KANKALABA", "LOUMANA", "NIANKORODOUGOU", "OUELENI", "SINDOU", "WOLONKOTO"],
    //"0601": ["SIGLE", "SOAW", "SOURGOU", "THYOU"],
    "0602": ["DASSA", "DIDYR", "GODYR", "KORDIE", "KYON", "POUNI", "REO", "TENADO", "ZAMO", "ZAWARA"],
    "0603": ["BIEHA", "BOURA", "LEO", "NEBIELIANAYOU", "NIABOURI", "SILLY"],
    "0301": ["KOMKI-IPALA", "KOMSILGA", "KOUBRI", "OUAGADOUGOU"],
    "0604": ["BAKATA", "BOUGNOUNOU", "DALO", "GAO", "CASSOU", "SAPOUY"],
    "0701": ["DOULOUGOU", "GAONGO", "IPELCE", "OUAGADOUGOU", "KAYAO", "PABRE", "SAABA", "TANGHIN-DASSOURI"],
    "0401": ["BAGRE", "BANE", "KOMBISSIRI", "SAPONE", "TOECE"],
    "0702": ["GUIARO", "PO", "TIEBELE"],
    "0803": ["BARTIEBOUGOU", "FOUTOURI", "GAYERI", "KOMPIENGA", "MADJOARI", "PAMA"],
    "0804": ["BOTOU", "DIAPAGA", "KANTCHARI", "LOGOBOU", "NAMOUNOU", "PARTIAGA", "TAMBAGA", "TANSARGA"],
    "0901": ["BAMA", "BOBO-DIOULASSO", "DANDE", "BEGUEDO", "BISSIGA", "BITTOU", "FARAMANA", "FO", "BOUSSOUMA", "GARANGO", "KOMTOEGA", "NIAOGO", "TENKODOGO", "ZABRE", "ZOAGA", "KARANGASSO-SAMBLA", "KARANGASSO-VIGUE", "KOUNDOUGOU", "LENA", "PADEMA", "PENI", "ZONSE", "SATIRI", "TOUSSIANA"],
    "0902": ["BANZON", "DJIGOUERA", "KANGALA", "DOURTENGA", "COMIN-YANGA", "LALGAYE", "OUARGAYE", "SANGA", "SOUDOUGUI", "YARGATENGA", "YONDE"],
    //"0903": ["ANDEMTENGA", "KAYAN", "KOLOKO", "KOURINION", "KOUROUMA", "MOROLABA", "N'DOROLA", "ORODARA", "SAMOROGOUAN", "SAMOGOHIRI", "SINDO"],
    "0903": ["BEKUY", "BEREBA", "BONI", "FOUNZAN", "HOUNDE", "KOTI", "KOUMBIA"],
    "1001": ["BANH", "OUINDIGUI", "SOLLE", "TITAO"],
    "1002": ["ARBOLE", "BAGARE", "BOKIN", "GOMPONSOM", "KIRSI", "LA-TODIN", "PILIMPIKOU", "SAMBA", "YAKO"],
    "0403": ["BASKOURE", "DIALGAYE", "GOUNGHIN", "KANDO", "KOUPELA", "POUYTENGA", "TENSOBENTENGA", "YARGO"],
    "0501": ["BOURZANGA", "GUIBARE", "KONGOUSSI"],
    "1003": ["BARGA", "KAIN", "NASSERE", "KALSAKA", "KOSSOUKA", "KOUMBRI", "NAMISSIGUIMA", "OUAHIGOUYA", "OULA", "RAMBO", "SEGUENEGA", "TANGAYE", "THIOU", "ZOGORE"],
    "1004": ["BASSI", "BOUSSOU", "GOURCY", "LEBA", "TOUGO"],
    "1101": ["BOUDRY", "KOGHO", "MEGUET", "MOGTEDO", "SALOGO", "ZAM", "ZORGHO", "ZOUNGOU"],
    "1102": ["BOUSSE", "LAYE", "NIOU", "SOURGOUBILA", "ROLLO", "ROUKO", "SABCE", "TIKARE", "ZIMTENGA"],
    //"1102": ["BOALA", "BOULSA", "BOUROUM", "DARGO", "DORI", "FALAGOUNTOU", "GORGADJI", "SAMPELGA", "SEYTENGA"],
    "1203": ["ARBINDA", "BARABOULE", "NAGBINGOU", "TOUGOURI", "YALGO", "ZEGUEDEGUIN","DJIBO", "KELBO", "KOUTOUGOU", "NASSOUMBOU", "POBE-MENGAO", "TONGOMAYEL"],
    //"1103": ["BERE", "BINDE", "GOGO", "GOMBOUSSOUGOU", "GUIBA", "MANGA", "NOBERE"],
    "0801": ["BILANGA", "BOGANDE", "COALLA", "LIPTOUGOU", "MANI", "PIELA", "NAMISSIGUIMA", "PENSA", "PIBAORE", "PISSILA", "ZIGA"],
    "0601": ["BINGO", "IMASGO", "KINDI", "KOKOLOGHO", "KOUDOUGOU", "NANDIALA", "NANORO", "PELLA", "POA", "RAMONGO", "SABOU", "THION"],
    "0802": ["DIABO", "DIAPANGOU", "FADA N'GOURMA", "MATIACOALI", "TIBGA", "YAMBA", "TOEGHIN"],
    "1103": ["ABSOUYA", "DAPELOGO", "LOUMBILA", "NAGREONGO", "OURGOU-MANEGA", "ZINIARE", "ZITENGA"],
    "1201": ["DEOU", "GOROM-GOROM", "MARKOYE", "OURSI", "TIN-AKOFF"],
    "1202": ["BANI", "DIGUEL"],
    "1204": ["BOUNDORE", "MANSILA", "SEBBA", "SOLHAN", "TANKOUGOUNADIE", "TITABE"],
    "1301": ["DIEBOUGOU", "DOLO", "BONDIGUI", "IOLONIORO", "TIANKOURA"],
    "1302": ["DANO", "DISSIN", "GUEGUERE", "KOPER", "NIEGO", "ORONKUA", "OUESSA", "ZAMBO"],
    "1303": ["BATIE", "BOUSSOUKOULA", "KPUERE", "LEGMOIN", "MIDEBDO"],
    "1304": ["BOUROUM-BOUROUM", "BOUSSERA", "DJIGOUE", "GAOUA"]
  }

  getProvincesByRegion(region: string) {
    return this.regions[region] || [];
  }

  getCommunesByProvince(province: string) {
    let key = this.provinces[province];
    return this.communes[key] || [];
  }
}
