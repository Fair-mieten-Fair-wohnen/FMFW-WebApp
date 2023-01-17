# --- database schema

# --- !Ups

USE
adwdoc;

delete
from value_lists_ext;

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'Person of Color', 'person_of_color', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'Sprache', 'language', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'nicht deutsch klingender Name',
        'not_german_sounding_name', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'Aufenthaltsstatus', 'unsecured_stay', 40);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'antiziganistische Diskriminierung',
        'antiziganistic_discrimination', 50);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin',
        'rassistische Diskriminierung, ethnische Herkunft', 10, 'anderes', 'other', 100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'männlich', 'f', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'weiblich', 'm', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'transsexuell', 'trans', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'intersexuell', 'inter', 40);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'Gender', 'Geschlecht', 20, 'anderes', 'other', 100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'lesbisch', 'lesbian', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'schwul', 'gay', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'bisexuell', 'bisequal', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'sexuell_identity', 'sexuelle Identität', 30, 'anderes', 'other', 100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'religion_weltanschauung', 'Religion, Weltanschauung', 40, 'muslimisch', 'muslim',
        10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'religion_weltanschauung', 'Religion, Weltanschauung', 40, 'jüdisch', 'jewish',
        20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'religion_weltanschauung', 'Religion, Weltanschauung', 40, 'anderes', 'other',
        100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'disability', 'Behinderung', 40, 'körperliche Behinderung', 'physical_disability',
        10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'disability', 'Behinderung', 40, 'chronische Krankheit', 'chronic_disease', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'disability', 'Behinderung', 40, 'anderes', 'other', 100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'age', 'Lebensalter', 50, 'zu jung', 'too_young', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'age', 'Lebensalter', 50, 'zu alt', 'too_old', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'age', 'Lebensalter', 50, 'anderes', 'other', 100);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'social_status', 'sozialer Status', 60, 'Einkommenssituation', 'money', 10);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'social_status', 'sozialer Status', 60, 'Erwerbslosigkeit', 'unemployment', 20);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'social_status', 'sozialer Status', 60, 'Familienstand / Haushaltsstruktur',
        'family_status', 30);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'social_status', 'sozialer Status', 60, '(vormalige) Wohnungslosigkeit',
        'homeless', 40);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'social_status', 'sozialer Status', 60, 'anderes', 'other', 100);
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`)
values ('grounds_of_discrimination', 'other', 'anderes / Kommentar', 100, '', '', 0);

# --- !Downs

USE
adwdoc;

delete
from value_lists_ext;