# --- database schema

# --- !Ups

USE
    adwdoc;

delete
from stats_key;

insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'type');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'metadata.institution');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'generaldata.contact_by');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'generaldata.anonymous');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.gender');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.age');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.ethnic_origin');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.funding_letigation_costs');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'short_description.incident_place.incident_district');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.general.area_of_discrimination');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.general.form_of_discrimination');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.causer_typology.causer_type');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.causer_typology.owner_agency');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.causer_typology.number_of_appartments');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'process_blog_part1.goal_person_concerned');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'process_blog_part1.areas_of_law');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'completion.result');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'supporter_list.support_format');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'causer_list.company_institution_name');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'interventions');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'involved_list');
insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'incident_typology.grounds_of_discrimination.selected_grounds');

insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'affected_person.funding_letigation_costs_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'short_description.incident_place.incident_district_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.causer_typology.owner_agency_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.causer_typology.owner_agency_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.grounds_of_discrimination.other_grounds.other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.general.form_of_discrimination_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.racist_discrimination_ethnic_origin_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.Gender_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.sexuell_identity_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.disability_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.religion_weltanschauung_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.age_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.social_status_other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'incident_typology.other_grounds.other');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'process_blog_part1.goal_person_concerned_others');
insert into stats_key (`stats_type`, `stats_key`)
values ('other', 'process_blog_part1.areas_of_law_others');

# --- !Downs

USE
    adwdoc;

delete
from stats_key;
