
# --- database schema

# --- !Ups

USE adwdoc;

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'draft_letter', 'Briefentwurf', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'new_letter', 'Erneuter Brief', 140);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'support_trial', 'Begleitung zur Gerichtsverhandlung', 150);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'support_sentencing', 'Begleitung zur Urteilsverkündung', 170);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'legal_support', 'Beistandschaft § 23 AGG', 160);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'communication', 'Kommunikation mit der betroffenen Person', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'legal_aid_request', 'Prozesskostenhilfe angefragt', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'phone_call', 'Telefonat', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'complaint_withdrawn', 'Beschwerde zurückgezogen ', 190);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'appeal', 'Berufung eingereicht', 180);

update value_lists set `weight`='10' where `key`='Information_legal_situation_and_possible procedure';
update value_lists set `weight`='40' where `key`='information_to_accused';
update value_lists set `weight`='30' where `key`='discrimination_ccomplaint';
update value_lists set `weight`='50' where `key`='Information_to_higher_hieraran_of_accused';
update value_lists set `weight`='120' where `key`='mediation_asked';
update value_lists set `weight`='130' where `key`='mediation_done';
update value_lists set `weight`='110' where `key`='Cooperation/refernce_to';
update value_lists set `weight`='100' where `key`='press_public';
update value_lists set `weight`='90' where `key`='legal_action';

update value_lists set `weight`='200' where `key`='other';
# --- !Downs

USE adwdoc;

delete from value_lists;
