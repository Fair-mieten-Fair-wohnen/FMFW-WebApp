
# --- database schema

# --- !Ups

USE adwdoc;

update column_names set `type`='institution-with-other' where `table_name`='incidents' and `ref`='responsible_institution';

# --- !Downs

USE adwdoc;
