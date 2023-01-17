
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `key`='information_to_accused';
update value_lists set `listtype`='form_of_intervention' where `listtype`='form_intervention';

# --- !Downs

USE adwdoc;

