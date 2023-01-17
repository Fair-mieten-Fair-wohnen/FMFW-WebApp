
# --- database schema

# --- !Ups

USE adwdoc;

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'internet', 'Internetsuche', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'flyer', 'Flyer', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'recommendation', 'Empfehlung', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'forwarding', 'Verweisberatung', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'lads', 'LADS', 50);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'tur', 'Türkisch', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'it', 'Italienisch', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'sp', 'Spanisch', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'rum', 'Rumanisch', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('advise_language', 'arab', 'Arabisch', 70);

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_children', 'kids_unkown', 'unbekannt', 5);
# --- !Downs

USE adwdoc;

delete from value_lists;
