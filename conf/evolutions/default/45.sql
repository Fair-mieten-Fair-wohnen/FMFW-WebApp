# --- database schema

# --- !Ups

USE adwdoc;

update incidents
set incidents.incident = JSON_SET(incident, '$.metadata.responsible_institution', replace(
        replace(lower(trim(JSON_VALUE(incident, '$.metadata.responsible_institution'))), ' ', '_'), '-', '_'));

# --- !Downs

USE adwdoc;
