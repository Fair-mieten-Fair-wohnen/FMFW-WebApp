export const TIME_OF_DATA_DUMPS = [
  {
    "jobId": 5,
    "jobTimestamp": "2020-02-10T15:13:52.000+0100"
  },
  {
    "jobId": 4,
    "jobTimestamp": "2020-02-10T15:08:52.000+0100"
  },
  {
    "jobId": 3,
    "jobTimestamp": "2020-02-10T15:03:52.000+0100"
  },
  {
    "jobId": 2,
    "jobTimestamp": "2020-02-10T14:58:52.000+0100"
  },
  {
    "jobId": 1,
    "jobTimestamp": "2020-02-10T14:53:53.000+0100"
  }
];

export const AGGREGATION_TYPES = [
  {id: 'agg_incidenttype', complexity: 'simple', order: '10', title: 'Vorgangstyp', subtitle: 'Welcher „Typ“ der Beratung kommt am häufigsten vor?', description: ''},
  {id: 'agg_institution', complexity: 'special', order: '20', title: 'Träger / Institution', subtitle: 'Wie viele Fälle hat welche Institution eingetragen?', description: ''},
  {id: 'agg_contactby', complexity: 'simple', order: '30', title: 'Kontaktaufnahme durch', subtitle: 'Wer kommt in die Beratung?', description: ''},
  {id: 'agg_anonymous', complexity: 'special', order: '', title: '', subtitle: '', description: ''},
  {id: 'agg_gender', complexity: 'simple', order: '40', title: 'Gender', subtitle: 'Wer kommt in die Beratung?', description: ''},
  {id: 'agg_age', complexity: 'simple', order: '50', title: 'Alter', subtitle: 'Wer kommt in die Beratung?', description: ''},
  {id: 'agg_funding_letigation_costs', complexity: 'simple', order: '60', title: 'Prozesskostenübernahme', subtitle: 'Sind Prozesskostenübernahmen wahrscheinlich?', description: ''},
  {id: 'agg_incident_district', complexity: 'simple', order: '70', title: 'Bezirk des Vorfalls', subtitle: 'In welchen Berliner Bezirken werden die meisten Diskriminierungsvorfälle gemeldet?', description: ''},
  {id: 'agg_area_of_discrimination', complexity: 'simple', order: '80', title: 'Bereich der Diskriminierung', subtitle: 'In welchem Bereich werden die meisten Vorfälle benannt?', description: ''},
  {id: 'agg_form_of_discrimination', complexity: 'simple', order: '90', title: 'Form der Diskriminierung', subtitle: 'Welche Form haben die Diskriminierungsvorfälle?', description: ''},
  {id: 'agg_causer_type', complexity: 'simple', order: '100', title: '„Typ“ der Verursachenden', subtitle: 'Wer diskriminiert?', description: ''},
  {id: 'agg_owner_agency', complexity: 'simple', order: '110', title: 'bei Wohnunseigentümer*in / -verwalter*in', subtitle: '', description: ''},
  {id: 'agg_number_of_appartments', complexity: 'simple', order: '120', title: 'bei Wohnunseigentümer*in / -verwalter*in', subtitle: '', description: ''},
  {id: 'agg_goal_person_concerned', complexity: 'simple', order: '130', title: 'Ziel(e) der betroffenen Person', subtitle: 'Was sind die Erwartungen und Ziele der betroffenen Person', description: ''},
  {id: 'agg_areas_of_law', complexity: 'simple', order: '140', title: 'Relevante(r) Rechtsbereich(e)', subtitle: 'Welche Rechtsbereiche sind betroffen', description: ''},
  {id: 'agg_result', complexity: 'simple', order: '150', title: 'Abschluss / Ergebnis', subtitle: 'Welche Ergebnisse konnte die Fachstelle erzielen?', description: ''},
  {id: 'agg_support_format', complexity: 'simple', order: '160', title: 'Unterstützungsformat', subtitle: 'Welche Form der Unterstützung kommt am häufigsten vor?', description: ''},
  {id: 'agg_form_of_intervention', complexity: 'simple', order: '170', title: 'Interventionen der Fachstelle', subtitle: 'Welche Intervention hat die Fachstelle durchgeführt?', description: ''},
  {id: 'agg_grounds_of_discrimination', complexity: 'special', order: '180', title: 'Diskriminierungsmerkmal', subtitle: 'Aufgrund von welchen (zugeschriebenen) Merkmalen wurden die betroffenen Personen diskriminiert?', description: ''},
  {id: 'agg_gender_district', complexity: 'complex', order: '300', title: 'Gender pro Bezirk des Vorfalls', subtitle: '', description: ''}
];

export const SIMPLE_AGGREGATION_DATA = {
  aggregationType: "agg_incidenttype",
 timeOfDataDump: "20200131",
 columnLabels: ["allgemeine Beratung", "Meldung", "Fallbetreuung"],
 rowLabels: [],
 data: [[103, 50, 99]],
};

export const COMPLEX_AGGREGATION_DATA = {
  aggregationType: "agg_gender_district",
  timeOfDataDump: "20200131",
  columnLabels: ["Charlottenburg-Wilmersdorf", "Friedrichshain-Kreuzberg", "Lichtenberg", "Marzahn-Hellersdorf", "Mitte", "Neukölln", "Pankow", "Reinickendorf", "Spandau", "Steglitz-Zehlendorf", "Tempelhof-Schöneberg", "Treptow-Köpenick", "anderes"],
  rowLabels: ["weiblich", "männlich", "Divers", "keine Angabe"],
  data: [
    [4, 5, 3, 12, 11, 15, 13, 20, 11, 23, 18, 14, 19],
    [11, 15, 13, 20, 11, 23, 18, 14, 19, 3, 4, 12, 1],
    [1, 3, 2, 2, 0, 2, 5, 2, 3, 7, 1, 2, 0],
    [2, 3, 7, 1, 2, 0, 1, 3, 2, 2, 0, 2, 5]]
};
