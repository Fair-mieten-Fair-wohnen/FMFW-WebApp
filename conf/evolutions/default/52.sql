
# --- database schema

# --- !Ups

USE adwdoc;
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('area_of_discrimination', 'business', 'Gewerbe', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'physical_attacks', 'Körperlicher Angriff', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'sexual_harassment', 'Sexualisierte Belästigung', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'verbal_harassment', 'Verbale Belästigung', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'non_verbal_harassment', 'Non-verbale Belästigung', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_discrimination', 'property_damage', 'Sachbeschädigung', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'partner', 'Lebenspartner*in', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'shelter_management', 'Unterkunftsleitung', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'free_bearer', 'Freier Träger ', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('causer', 'internetplattform', 'Internetplattform ', 95);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned', 'change_procurement_practices', 'Vergabepraxis ändern ', 110);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('goal_person_concerned', 'move', 'Umzug', 120);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', ' LADG ', ' LADG ', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('areas_of_law', ' DSGVO ', ' DSGVO ', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'not_completed', 'noch nicht abgeschlossen ', 165);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'referral', 'Weitervermittlung', 170);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'empowerment', 'Empowerment der ratsuchenden Person', 175);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'take_serious', 'Ratsuchende Person wird ernstgenommen ', 180);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('outcome', 'make_discr_visible', 'Diskriminierung sichtbar gemacht', 185);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('become_aware_of', 'press', 'Presse', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('affected_group', 'partnership', 'Partnerschaft/Ehe', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'conversation_with_opponent', 'Gespräch mit der Gegenseite', 197);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('form_of_intervention', 'research', 'Recherche', 198);


insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin ', 'rassistische Diskriminierung, ethnische Herkunft', 10, 'Ethnische Herkunft', 'ethnic_origin', 60);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin ', 'rassistische Diskriminierung, ethnische Herkunft', 10, 'Staatsangehörigkeit', 'nationality', 70);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin ', 'rassistische Diskriminierung, ethnische Herkunft', 10, 'Fluchterfahrung', 'refugee', 80);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'nicht-binär', 'non_binary', 50);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'queer', 'queer', 40);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'asexuell', 'asexual', 50);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'religion_weltanschauung', 'Religion, Weltanschauung', 40, 'Weltanschauung', 'weltanschauung', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'religion_weltanschauung', 'Religion, Weltanschauung', 40, 'Konfessionslos', 'non_denominational', 40);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'social_status', 'sozialer status', 60, 'Bildung', 'education', 50);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'social_status', 'sozialer status', 60, 'Schwangerschaft / Kinderwunsch', 'pregnancy', 60);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'appearance', 'Äußere Erscheinungsform', 70, 'Körperform', 'body_shape', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'appearance', 'Äußere Erscheinungsform', 70, 'Körpergewicht', 'body_weight', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'appearance', 'Äußere Erscheinungsform', 70, 'Körpergröße', 'body_height', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'appearance', 'Äußere Erscheinungsform', 70, 'anderes', 'others', 100);

# --- !Downs

USE adwdoc;
