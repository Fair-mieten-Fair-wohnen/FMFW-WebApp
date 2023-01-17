# --- database schema

# --- !Ups

USE adwdoc;

delete
from aggs;

alter table `aggs` modify `description` text;

insert into `aggs` (`id`, `aggr_id`, `param_key1`, `param_key2`, `order`, `title`, `sub_title`, `description`, `population_type`) values
(1, 'agg_type', 'type', '', 20, 'Vorgangstyp', 'Welcher „Typ“ der Beratung kommt am häufigsten vor?', 'Das Dokumentationssystem unterscheidet zwischen drei Typen der Beratung: Allgemeine Beratung, Meldung und Fallbetreuung. ', 'AMF'),
(2, 'agg_institution', 'institution', '', 10, 'Träger / Institution', 'Wie viele Fälle hat welche Institution eingetragen?', '', 'AMF'),
(3, 'agg_contact_by', 'contact_by', '', 30, 'Kontaktaufnahme durch', 'Wer kommt in die Beratung?', 'Neben betroffenen Personen, kommen in die Beratung auch unbeteiligte Personen und beschuldigte Personen. Unbeteiligte Personen sind z.B. Freund*innen, Zeug*innen oder auch ehrenamtliche Betreuer*innen, die z.B. eine betroffene Person konkret unterstützen.', 'AMF'),
(4, 'agg_first_contact_date', 'first_contact_date', '', 31, 'Datum Kontaktaufnahme:', 'Datum der ersten Kontaktaufnahme?', 'Wann war die erste Kontaktaufnahme mit der Beratungsstelle?', 'AMF'),
(5, 'agg_advise_language', 'advise_language', '', 32, 'Sprache', 'Sprache in der die Beratung stattfinden soll:', 'In welcher Sprache hat die Beratung stattgefunden?', 'MF'),
(6, 'agg_become_aware_of', 'become_aware_of', '', 33, 'Wie haben Sie von der Fachstelle erfahren?', 'Wie haben Sie von der Fachstelle erfahren?', 'Durch welche Kommunikationskanäle (z.B. Flyer, Medien, Verweisberatung, Veranstaltungen) hat die ratsuchende Person von der Fachstelle erfahren?', 'AMF'),
(7, 'agg_affected_group', 'affected_group', '', 34, 'Wer ist betroffen?', 'Wer ist betroffen?', 'Wer ist die betroffene Person? Eine alleinstehende Person, eine Familie oder vielleicht ein alleinerziehender Vater?', 'MF'),
(8, 'agg_gender', 'gender', '', 40, 'Gender', 'Wer kommt in die Beratung?', 'Mit welchem Geschlecht stellt sich die ratsuchende Person vor?', 'MF'),
(9, 'agg_age', 'age', '', 50, 'Alter', 'Wer kommt in die Beratung?', 'Welcher Altersgruppe gehört die betroffene Person an?', 'MF'),
(10, 'agg_funding_letigation_costs', 'funding_letigation_costs', '', 60, 'Prozesskostenübernahme', 'Sind Prozesskostenübernahmen wahrscheinlich?', 'Ist die Übernahme von Prozesskosten wahrscheinlich? ', 'MF'),
(11, 'agg_incident_district', 'incident_district', '', 122, 'Bezirk des Vorfalls', 'In welchen Berliner Bezirken werden die meisten Diskriminierungsvorfälle gemeldet?', 'In welchen Berliner Bezirken hat eine Diskriminierung stattgefunden?', 'MF'),
(12, 'agg_area_of_discrimination', 'area_of_discrimination', '', 80, 'Bereich der Diskriminierung', 'In welchem Bereich werden die meisten Vorfälle benannt?', 'Diskriminierungen auf dem Wohnungsmarkt finden statt bei der Wohnungssuche (Vermietung und Vermittlung) und in bestehenden Wohnverhältnissen.', 'MF'),
(13, 'agg_form_of_discrimination', 'form_of_discrimination', '', 90, 'Form der Diskriminierung', 'Welche Form haben die Diskriminierungsvorfälle?', 'Diskriminierungen auf dem Wohnungsmarkt treten in sehr unterschiedlichen Formen auf. Neben den direkten Formen, die meist zumindest von den Betroffenen klar als Diskriminierung wahrgenommen werden, sind weitere Formen von Diskriminierung zu unterscheiden, die schwieriger zu erkennen und zu bekämpfen sind. ', 'MF'),
(14, 'agg_causer_company_institution_name', 'causer_company_institution_name', '', 101, 'Firma/ Institution (Verursacher)', 'Name des Verursachers', 'Name des verursachenden Unternehmens.', 'MF'),
(15, 'agg_causer_type', 'causer_type', '', 100, '„Typ“ der Verursachenden', 'Wer diskriminiert?', 'Diskriminierungen im Bereich Wohnen erfolgen zum Beispiel durch Wohnungseigentümer*innen, Wohnungsverwalter*innen, Hausmeister*innen, Nachbar*innen, (öffentliche) Institutionen, Makler*innen, etc. ', 'MF'),
(16, 'agg_causer_owner_agency', 'causer_owner_agency', '', 110, 'bei Wohnunseigentümer*in / -verwalter*in', 'Welche "Geschäftsform" hat der Verursacher?', 'Bei den Wohnungseigentümer*innen und den Wohnungsverwaltungen wird weiter unterschieden, ob diese als privat, kommunal, genossenschaftlich, oder als sozialer Träger zu verstehen sind.', 'MF'),
(17, 'agg_causer_number_of_appartments', 'causer_number_of_appartments', '', 120, 'bei Wohnunseigentümer*in / -verwalter*in', 'Wie viele Wohnungen hat der Verursachungstyp', 'Nach dem AGG greift das Diskriminierungsverbot nur dann, wenn die Vermieter*innen mehr als 50 Wohnungen vermieten, es sich also um ein sogenanntes „Massengeschäft“ handelt (AGG § 19 Abs. 1 Nr.1).', 'MF'),
(18, 'agg_incident_date', 'incident_date', '', 121, 'Datum des Vorfalls', 'Wann hat die Diskriminierung stattgefunden?', 'Wann hat die Diskriminierung stattgefunden?', 'MF'),
(19, 'agg_involved_list_not_empty', 'involved_list_not_empty', '', 125, 'Zeug*innen', 'Gibt es Zeug*innen?', 'Gibt es Zeug*innen für den Vorfall?', 'MF'),
(20, 'agg_evidence_list_not_empty', 'evidence_list_not_empty', '', 127, 'Beweise', 'Wurden Beweise gesammelt?', 'Wurden Beweise gesammelt?', 'MF'),
(21, 'agg_goal_person_concerned', 'goal_person_concerned', '', 130, 'Ziel(e) der betroffenen Person', 'Was sind die Erwartungen und Ziele der betroffenen Person', 'Betroffene Personen kommen mit sehr unterschiedlichen Zielen in die Beratung. Auch wenn die Fachstelle versucht immer den Wünschen der Betroffenen nachzukommen, ist das besonders schwierig, wenn sie den Wunsch haben, eine neue Wohnung zu bekommen. Das AGG gibt die rechtliche Grundlage, dass wenn eine Diskriminierung stattgefunden hat, die betroffene Person auf Schadensersatz klagen kann. Das bedeutet aber nicht, dass eine neue Wohnung bereitgestellt werden muss.', 'F'),
(22, 'agg_areas_of_law', 'areas_of_law', '', 140, 'Relevante(r) Rechtsbereich(e)', 'Welche Rechtsbereiche sind betroffen', 'Auch wenn das Allgemeine Gleichbehandlungsgesetz die rechtliche Grundlage für das Diskriminierungsverbot beim Zugang zu Wohnraum oder im bestehenden Wohnverhältnis ist, gibt es weitere Gesetze, die eine Rolle spielen. ', 'F'),
(23, 'agg_result', 'result', '', 150, 'Abschluss / Ergebnis', 'Welche Ergebnisse konnte die Fachstelle erzielen?', 'Anhand der Ziele der Betroffenen, wird gezeigt, welche Ergebnisse erreicht werden konnten und zu welchem Abschluss ein Fall gegeben falls gekommen ist.', 'F'),
(24, 'agg_support_format', 'support_format', '', 61, 'Unterstützungsformat', 'Welche Form der Unterstützung kommt am häufigsten vor?', 'Die Beratungspraxis zeigt, dass viele betroffene Personen nicht alleine in die Beratung kommen. Häufig werden sie durch weitere Personen unterstützt. Das Dokumentationssystem unterscheidet zwischen drei verschiedenen Unterstützungsformaten.', 'F'),
(25, 'agg_form_of_intervention', 'form_of_intervention', '', 145, 'Interventionen der Fachstelle', 'Welche Intervention hat die Fachstelle durchgeführt?', 'Zu den Interventionen der Beratungsstelle gehören unter anderem, das Verfassen von Beschwerdebriefen, die Begleitung zu Gesprächen, das Vermitteln von Rechtsanwält*innen, als auch eine Beistandschaft vor Gericht nach § 23 AGG.', 'F'),
(26, 'agg_grounds_of_discrimination', 'grounds_of_discrimination', '', 62, 'Diskriminierungsmerkmal', 'Aufgrund von welchen (zugeschriebenen) Merkmalen wurden die betroffenen Personen diskriminiert?', 'Diskriminierungen auf dem Wohnungsmarkt erfolgen aufgrund von Zuschreibungen bezüglich eines oder sich überschneidender Merkmale, die überwiegend im Allgemeinen Gleichbehandlungsgesetz (AGG) als Diskriminierungsmerkmale anerkannt sind. Eine präzise Zuordnung einer Diskriminierung zu einem bestimmten Diskriminierungsmerkmal ist allerdings häufig nicht einfach, beziehungsweise die Gründe, aus denen Diskriminierungen erfolgen, sind häufig nicht klar voneinander abzugrenzen. Das Dokumentationssystem stellt zur Auswahl alle im AGG genannten Diskriminierungsmerkmale und benennt einzelne vom AGG nicht geschützte Merkmale, wie zum Beispiel die soziale Lage.', 'MF'),
(27, 'agg_type_contact_by', 'type', 'contact_by', 300, 'Vorgangstyp pro Kontaktaufnahme durch', '', 'Welche ratsuchende Person nimmt welches Beratungsangebot an?', 'AMF'),
(31, 'agg_area_of_discrimination_incident_district', 'area_of_discrimination', 'incident_district', 340, 'Bereich der Diskriminierung pro Bezirk des Vorfalls', '', 'Gibt es unterschiedliche Muster der Diskriminierung in den Berliner Bezirken?', 'MF'),
(32, 'agg_form_of_discrimination_incident_district', 'form_of_discrimination', 'incident_district', 350, 'Form der Diskriminierung pro Bezirk des Vorfalls', '', 'Gibt es unterschiedliche Formen der Diskriminierung in den Berliner Bezirken?', 'MF'),
(33, 'agg_form_of_discrimination_area_of_discrimination', 'form_of_discrimination', 'area_of_discrimination', 360, 'Form der Diskriminierung pro Bereich der Diskriminierung', '', 'Gibt es unterschiedliche Formen der Diskriminierung bei der Wohnungssuche oder in bestehenden Wohnverhältnissen?', 'MF'),
(34, 'agg_causer_type_grounds_of_discrimination_kat', 'causer_type', 'grounds_of_discrimination_kat', 370, 'Typ des Verursachers pro Diskriminerungsmerkmal', '', 'Aufgrund von welchen (zugeschriebenen) Merkmalen wird von wem diskriminiert?', 'MF'),
(35, 'agg_causer_type_area_of_discrimination', 'causer_type', 'area_of_discrimination', 380, 'Typ des Verursachers pro Bereich der Diskriminierung', '', 'In welchen Bereichen diskriminiert wer?', 'MF'),
(36, 'agg_causer_type_form_of_discrimination', 'causer_type', 'form_of_discrimination', 390, 'Typ des Verursachers pro Form der Diskriminierung', '', 'Welcher Typ des Verursachers diskriminiert wie?', 'MF'),
(43, 'agg_goal_person_concerned_form_of_intervention', 'goal_person_concerned', 'form_of_intervention', 460, 'Ziel der betroffenen Person pro Form der Intervention', '', 'Welche Ziele der betroffenen Person, konnten durch welche Interventionen erreicht werden?', 'F'),
(44, 'agg_goal_person_concerned_result', 'goal_person_concerned', 'result', 470, 'Ziel der betroffenen Person pro Abschluss Ergebnis', '', 'Welche Ziele der betroffenen Person, haben zu welchen Ergebnissen geführt?', 'F'),
(45, 'agg_area_of_discrimination_form_of_intervention', 'area_of_discrimination', 'form_of_intervention', 480, 'Bereich der Diskriminierung pro Form der Intervention', '', 'Welche Interventionen wurden in welchen Bereichen durchgeführt?', 'F'),
(46, 'agg_area_of_discrimination_result', 'area_of_discrimination', 'result', 490, 'Bereich der Diskriminierung pro Abschluss Ergebnis', '', 'Welche Ergebnisse sind in welchen Bereichen wahrscheinlicher?', 'F'),
(48, 'agg_causer_type_result', 'causer_type', 'result', 510, 'Typ des Verursachers pro Abschluss Ergebniss', '', 'Fallen die Ergebnisse je nach Typ des Verursachers anders aus?', 'F'),
(49, 'agg_incident_district_causer_type', 'incident_district', 'causer_type', 520, 'Bezirk des Vorfalls + Typ des Verursachers', '', 'In welchem Bezirk diskriminiert welcher Typ des Verursachers?', 'MF');
# --- !Downs

USE adwdoc;

delete
from aggs;
