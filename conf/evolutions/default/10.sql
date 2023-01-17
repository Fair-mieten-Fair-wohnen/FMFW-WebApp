
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists;
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('incident_type', 'ALLG_BERATUNG', 'allgemeine Beratung', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('incident_type', 'MELDUNG', 'Meldung', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('incident_type', 'FALLBETREUUNG', 'Fallbetreuung', 30);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('gender', 'f', 'weiblich', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('gender', 'm', 'männlich', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('gender', 'div', 'Divers', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('gender', 'no_information', 'keine Angabe', 90);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('age', 'under_18', 'unter 18', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('age', '18_35', '18-35', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('age', '35_60', '35-60', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('age', 'over_60', 'über 60', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('age', 'no_information', 'keine Angabe', 90);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('funding_letigation_costs', 'yes', 'ja', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('funding_letigation_costs', 'no', 'nein', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('funding_letigation_costs', 'to_consider', 'zu prüfen', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('funding_letigation_costs', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'reference', 'Verweisberatung', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'cooperation', 'Kooperation', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'individual_support', 'individuelle Unterstützung', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('contact_by', 'affected_person', 'betroffene Person', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('contact_by', 'accused_person', 'beschuldigte Person', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('contact_by', 'uninvolved_person', 'unbeteiligte Person', 30);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Charlottenburg_Wilmersdorf', 'Charlottenburg-Wilmersdorf', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Friedrichshain_Kreuzberg', 'Friedrichshain-Kreuzberg', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Lichtenberg', 'Lichtenberg', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Marzahn_Hellersdorf', 'Marzahn-Hellersdorf', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Mitte ', 'Mitte ', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Neukölln', 'Neukölln', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Pankow', 'Pankow', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Reinickendorf', 'Reinickendorf', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Spandau', 'Spandau', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Steglitz_Zehlendorf', 'Steglitz-Zehlendorf', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Tempelhof_Schöneberg', 'Tempelhof-Schöneberg', 110);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'Treptow_Köpenick', 'Treptow-Köpenick', 120);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('district', 'other', 'anderes', 200);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('area_of_discrimination ', 'apartment_search', 'Wohnungssuche', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('area_of_discrimination ', 'existing_housing_situation', 'im bestehenden Wohnverhältnis', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('area_of_discrimination ', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'direct', 'unmittelbar ', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'indirect', 'mittelbar', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'harassment_verbal_attacks', 'Belästigung, verbale Angriffe', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'owner', 'Wohnungseigentümer*in', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'agency', 'Wohnungsverwalter*in', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'janitor', 'Hausmeister*in', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'neighbor', 'Nachbar*innen', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'public_institution', '(öffentliche) Institution', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'broker', 'Makler*in', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('owner_agency', 'municipal', 'kommunal', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('owner_agency', 'cooperative', 'genossenschaftlich', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('owner_agency', 'privat', 'privat', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('owner_agency', 'social_agency', 'sozialer Träger', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('owner_agency', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_appartments', 'more_50', 'mehr als 50 Wohneinheiten', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_appartments', 'less_50', 'weniger als 50 Wohneinheiten', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_appartments', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'apology', 'Entschuldigung', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'amicable_settlement', 'gütliche Einigung', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'legal_advise', 'juristische Beratung', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'legal_clarification', 'gerichtliche Klärung', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'mediation', 'Mediation', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'remedy_deficiencies', 'Behebung von Mängeln', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'Improvement_neighborly_coexistence', 'Verbesserung des nachbarschaftlichen Miteinanders', 7);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'compensation', 'Schadensersatz', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'housing_received', 'Wohnung bekommen', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'keep_housing', 'Wohnung behalten', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned ', 'other', 'anderes', 200);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'AGG', 'Allgemeines Gleichbehandlungsgesetz', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'rental_law', 'Mietrecht', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'StGB', 'Strafrecht', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'SGB', 'Sozialgesetzbuch', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'AufenthG', 'Aufenthaltsrecht', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'Information_legal_situation_and_possible procedure', 'Information über Rechtslage und mögliches Vorgehen', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'information_to_accused', 'Information an Beschuldigte*n versandt', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'discrimination_ccomplaint', 'Diskriminierungsbeschwerde eingereicht ', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'Information_to_higher_hieraran_of_accused', 'Information an hierarisch höherer Ebene des*r Beschuldigten versandt', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'mediation_asked', 'Mediation angefragt', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'mediation_done', 'Mediation durchgeführt', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'Cooperation/refernce_to', 'Kooperation / Verweisberatung mit', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'press_public', 'an Presse, Öffentlichkeit getreten', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'legal_action', 'Klage/ juristisches Vorgehen', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'other', 'anderes', 200);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'apology', 'Entschuldigung', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'amicable_settlement', 'gütliche Einigung', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'legal_advise', 'juristische Beratung', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'legal_clarification', 'gerichtliche Klärung', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'mediation', 'Mediation', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'remedy_deficiencies', 'Behebung von Mängeln', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'Improvement_neighborly_coexistence', 'nachbarschaftliches Miteinander verbessern', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'compensation', 'Schadensersatz', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome ', 'housing_received', 'Wohnung bekommen', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome ', 'keep_housing', 'Wohnung behalten', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'other', 'anderes', 200);



# --- !Downs

USE adwdoc;

delete from value_lists;