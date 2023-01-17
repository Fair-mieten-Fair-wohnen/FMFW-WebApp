
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists set `listtype`='form_intervention' where `listtype`='form_of_intervention';
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_intervention', 'information_to_accused', 'Information an Beschuldigte*n versandt', 20);

# --- !Downs

USE adwdoc;

