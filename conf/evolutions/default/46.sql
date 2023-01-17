# --- database schema

# --- !Ups

USE adwdoc;

update `aggs` set `title`='Verursacher (Firma/ Institution)' where `aggr_id`='agg_causer_company_institution_name';

# --- !Downs

USE adwdoc;
