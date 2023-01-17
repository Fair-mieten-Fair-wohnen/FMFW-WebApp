#1
select d.it as incident_type, d.cb as contact_by, count(*) as count
from (select incident_type as it, JSON_EXTRACT(incident, '$.generaldata.contact_by') as cb from incidents) as d
group by d.it, d.cb;

#2
select d.cb as contact_by, d.ge as gender, count(*) as count
from (select JSON_EXTRACT(incident, '$.generaldata.contact_by') as cb,
             JSON_EXTRACT(incident, '$.affected_person.gender') as ge
      from incidents) as d
group by d.cb, d.ge;

#3
select d.it as incident_type, d.cb as contact_by, d.age as age, count(*) as count
from (select incident_type                                      as it,
             JSON_EXTRACT(incident, '$.generaldata.contact_by') as cb,
             JSON_EXTRACT(incident, '$.affected_person.age')    as age
      from incidents) as d
group by d.it, d.cb, d.age;

#4
# select d.iname, count(*)
# from (select JSON_EXTRACT(incident, '$.causer_list.company_institution_name') as iname from incidents) as d
# group by d.iname;
#4.1
select tcomp.iname as institution_name, count(tcomp.iname) as count
from (select tc.id, TRIM(REPLACE(tc.iname, "\"", "")) as iname
      from (
               select id, JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[1].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[2].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[3].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[4].company_institution_name') as iname
               from incidents
           ) as tc
      where tc.iname != ""
        and not isnull(iname)
      order by tc.id
     ) as tcomp
group by tcomp.iname
;

#4.2
select tcomp.iname as institution_name, tbezirk.bezirk as bezirk, count(tbezirk.bezirk) as count
from (select tc.id, TRIM(REPLACE(tc.iname, "\"", "")) as iname
      from (
               select id, JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[1].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[2].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[3].company_institution_name') as iname
               from incidents
               union
               select id, JSON_EXTRACT(incident, '$.causer_list[4].company_institution_name') as iname
               from incidents
           ) as tc
      where tc.iname != ""
        and not isnull(iname)
      order by tc.id
     ) as tcomp,
     (select distinct tb.*
      from (
               select id,
                      trim(REPLACE(JSON_EXTRACT(incident, '$.short_description.incident_place.incident_district'), "\"",
                                   "")) as bezirk
               from incidents
               union
               select id,
                      trim(REPLACE(
                              JSON_EXTRACT(incident, '$.short_description.incident_place.incident_district_others'),
                              "\"", "")) as bezirk
               from incidents
           ) as tb
      where not isnull(tb.bezirk)
        AND LENGTH(tb.bezirk) > 0
     ) as tbezirk
where tcomp.id = tbezirk.id
group by tcomp.iname, tbezirk.bezirk;

#5
select tgofs.gof, gender.gender, count(gender.gender) as count
from (
         select id,
                "grounds_of_discrimination other"                                                    as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.other') as gof_val
         from incidents
         union
         select id,
                "person_of_color"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.person_of_color') as gof_val
         from incidents
         union
         select id,
                "language"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.language') as gof_val
         from incidents
         union
         select id,
                "not_german_sounding_name"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.not_german_sounding_name') as gof_val
         from incidents
         union
         select id,
                "unsecured_stay"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.unsecured_stay') as gof_val
         from incidents
         union
         select id,
                "antiziganistic_discrimination"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.antiziganistic_discrimination') as gof_val
         from incidents
         union
         select id,
                "social_status_other"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.social_status_other') as gof_val
         from incidents
     ) as tgofs,
     (select id,
             JSON_EXTRACT(incident, '$.affected_person.gender') as gender
      from incidents) as gender

where tgofs.id = gender.id
  and tgofs.gof_val = "true"
group by tgofs.gof, gender.gender
having count(gender.gender) > 0
;
#6
select tgofs.gof, age.age, count(age.age) as count
from (
         select id,
                "grounds_of_discrimination other"                                                    as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.other') as gof_val
         from incidents
         union
         select id,
                "person_of_color"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.person_of_color') as gof_val
         from incidents
         union
         select id,
                "language"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.language') as gof_val
         from incidents
         union
         select id,
                "not_german_sounding_name"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.not_german_sounding_name') as gof_val
         from incidents
         union
         select id,
                "unsecured_stay"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.unsecured_stay') as gof_val
         from incidents
         union
         select id,
                "antiziganistic_discrimination"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.antiziganistic_discrimination') as gof_val
         from incidents
         union
         select id,
                "social_status_other"                                                                              as gof,
                JSON_EXTRACT(incident,
                             '$.incident_typology.grounds_of_discrimination.selected_grounds.social_status_other') as gof_val
         from incidents
     ) as tgofs,
     (select id,
             JSON_EXTRACT(incident, '$.affected_person.age') as age
      from incidents) as age

where tgofs.id = age.id
  and tgofs.gof_val = "true"
group by tgofs.gof, age.age
having count(age.age) > 0
order by age.age
;

#7


select iname as institution_name, count(*) as count
from (select trim(JSON_EXTRACT(incident, '$**.company_institution_name')) as iname from incidents) as d
where not isnull(d.iname)
group by iname
order by count(*) desc;

select JSON_EXTRACT(incident, '$.metadata.institution')                                      as inst,
       incident_type                                                                         as it,
       JSON_EXTRACT(incident, '$.generaldata.contact_by')                                    as cb,
       JSON_EXTRACT(incident, '$.generaldata.anonymous')                                     as ano,
       JSON_EXTRACT(incident, '$.affected_person.gender')                                    as gen,
       JSON_EXTRACT(incident, '$.affected_person.ethnic_origin')                             as ethn,
       JSON_EXTRACT(incident, '$.affected_person.funding_letigation_costs')                  as fund,
       JSON_EXTRACT(incident, '$.affected_person.funding_letigation_costs_others')           as fundo,
       JSON_EXTRACT(incident, '$.short_description.incident_place.incident_district')        as district,
       JSON_EXTRACT(incident, '$.short_description.incident_place.incident_district_others') as district_o
from incidents;


select d.it, count(*) as anzahl
from (select incident_type as it from incidents) as d
group by d.it
;

select d.it, d.sf, count(*) as anzahl
from (
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[0].support_format') as sf
          from incidents)
         UNION ALL
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[1].support_format') as sf
          from incidents)
         UNION ALL
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[2].support_format') as sf
          from incidents)
     ) as d
where not isnull(d.sf)
group by d.it, d.sf
;

select d.it, d.sfo, count(*) as anzahl
from (
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[0].support_format_others') as sfo
          from incidents)
         UNION ALL
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[1].support_format_others') as sfo
          from incidents)
         UNION ALL
         (select id, incident_type as it, JSON_EXTRACT(incident, '$.supporter_list[2].support_format_others') as sfo
          from incidents)
     ) as d
where not isnull(d.sfo)
group by d.it, d.sfo
;

select d.it, d.cin, count(*) as anzahl
from (
         (select id,
                 incident_type                                                                                as it,
                 JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name')                          as cin,
                 lower(replace(JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name'), " ", "")) as cin_tr
          from incidents)
         UNION ALL
         (select id,
                 incident_type                                                                                as it,
                 JSON_EXTRACT(incident, '$.causer_list[1].company_institution_name')                          as cin,
                 lower(replace(JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name'), " ", "")) as cin_tr
          from incidents)
         UNION ALL
         (select id,
                 incident_type                                                                                as it,
                 JSON_EXTRACT(incident, '$.causer_list[2].company_institution_name')                          as cin,
                 lower(replace(JSON_EXTRACT(incident, '$.causer_list[0].company_institution_name'), " ", "")) as cin_tr
          from incidents)
     ) as d
where not isnull(d.cin)
  and d.cin != ""
group by d.it, d.cin_tr
order by count(*) desc
;


# Update agg_grounds_of_discrimination
select stat_value,
       convert(stat_value / 2, UNSIGNED)
from archive_stat
where stat_path = 'incident_typology.grounds_of_discrimination.selected_grounds'
  and job_id >= 35861;

update archive_stat
set stat_value = convert(stat_value / 2, UNSIGNED)
where stat_path = 'incident_typology.grounds_of_discrimination.selected_grounds'
  and job_id >= 35861;

# Delete incidents
delete
from incidents
where id in
      (547, 293, 681, 543, 292, 682, 538, 291, 683, 537, 287, 282, 536, 286, 95, 535, 285, 94, 504, 284, 93, 649, 100,
       90, 650, 86, 88, 84, 87)
