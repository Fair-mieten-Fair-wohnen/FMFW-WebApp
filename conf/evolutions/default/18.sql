
# --- database schema

# --- !Ups

USE adwdoc;

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('type_of_advise', 'appartment_search', 'Wohnungssuche', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('type_of_advise', 'forwarding', 'Verweisberatung (├╝berregional)', 20);

# --- !Downs

USE adwdoc;

delete from value_lists;
