
# --- database schema

# --- !Ups

USE adwdoc;

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'de', 'Deutsch', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'en', 'Englisch', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'other', 'anderes', 100);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'family', 'Familie', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'single', 'Alleinstehend', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'single_parent', 'Alleinerziehend', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'more_person_household', 'Mehrpersonenhaushalt', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'other', 'anderes', 100);


insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_0', '0', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_1', '1', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_2', '2', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_3', '3', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_4', '4', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_5', '5', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_morethan5', 'mehr als 5', 70);

# --- !Downs

USE adwdoc;

delete from value_lists;
