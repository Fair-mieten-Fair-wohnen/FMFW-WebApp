# --- database schema

# --- !Ups

USE adwdoc;
update incidents
set incident = JSON_INSERT(JSON_INSERT(incident, '$.metadata.responsible_institution', institution),
                           '$.metadata.external_incident', if(institution = 'FMFW-Fachstelle', false, true));
update incidents
set institution = 'FMFW-Fachstelle';

# --- !Downs

USE adwdoc;
