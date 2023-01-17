
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `key`='roommate';
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'roommate', 'Mitbewohner*in', 70);

update value_lists_ext set `label`='anderes' where `listtype`='grounds_of_discrimination' and `key`='other';

# --- !Downs

USE adwdoc;
