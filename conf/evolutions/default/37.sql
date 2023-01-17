# --- database schema

# --- !Ups

USE adwdoc;

update value_lists set `label`='AGG' where `listtype`='areas_of_law' and `key`='AGG';
update value_lists set `label`='Mietrecht' where `listtype`='areas_of_law' and `key`='rental_law';
update value_lists set `label`='StGB' where `listtype`='areas_of_law' and `key`='StGB';
update value_lists set `label`='SGB' where `listtype`='areas_of_law' and `key`='SGB';
update value_lists set `label`='AufenthG' where `listtype`='areas_of_law' and `key`='AufenthG';
update value_lists set `label`='BGB' where `listtype`='areas_of_law' and `key`='german_civil_code';
update value_lists set `label`='anderes' where `listtype`='areas_of_law' and `key`='other';

# --- !Downs

USE adwdoc;
