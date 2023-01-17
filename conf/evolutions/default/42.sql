# --- database schema

# --- !Ups

USE adwdoc;
update incidents
set incidents.incident = JSON_SET(incident, '$.metadata.institution', incidents.institution);

# --- !Downs

USE adwdoc;
