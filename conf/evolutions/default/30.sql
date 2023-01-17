
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `key`='legal_guardian';
delete from value_lists where `key`='translation';
delete from value_lists where `key`='voluntary_support';
delete from value_lists where `key`='unknown';
delete from value_lists where `key`='roommate';
delete from value_lists where `key`='uncover_discrimination';
delete from value_lists where `key`='german_civil_code';
delete from value_lists where `key`='support_terminated';
delete from value_lists where `key`='not_sent';
delete from value_lists where `key`='no_reaction';
delete from value_lists where `key`='lawsuit_won';
delete from value_lists where `key`='lawsuit_lost';
delete from value_lists where `key`='legally_binding';
delete from value_lists where `key`='relocation';
delete from value_lists where `key`='written_answer';
delete from value_lists where `key`='reference_others';

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'legal_guardian', 'Gesetzliche*r Betreuer*in', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'translation', 'Sprachvermittlung', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('support_format', 'voluntary_support', 'Ehrenamtliche Unterstützung', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('incident_place.incident_district', 'unknown', 'Unbekannt', 130);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_appartments', 'roommate', 'Mitbewohner*in', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned', 'uncover_discrimination', 'Diskriminierung sichtbar machen', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', 'german_civil_code', 'Bürgerliches Gesetzbuch', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'support_terminated', 'Begleitung der Ratsuchenden beendet', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'not_sent', 'Diskriminierungsbeschwerde nicht abgeschickt', 110);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'no_reaction', 'Keine Reaktion', 120);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'lawsuit_won', 'Klage gewonnen', 130);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'lawsuit_lost', 'Klage verloren', 140);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'legally_binding', 'Urteil rechtskräftig', 150);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'relocation', 'Umzug', 160);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'written_answer', 'Schriftliche Antwort', 193);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'reference_others', 'Verweis an andere Stelle', 196);


delete from value_lists_ext where `sub_key`='mental_illness';

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'disability', 'Behinderung', 40, 'Psychische Erkrankung', 'mental_illness', 30);

# --- !Downs

USE adwdoc;

