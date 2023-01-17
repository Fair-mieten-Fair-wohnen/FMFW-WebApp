
# --- database schema

# --- !Ups

USE adwdoc;

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('number_of_appartments', 'unknown', 'nicht bekannt', 30);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'racist_discrimination_ethnic_origin', 'rassistische Diskriminierung, ethnische Herkunft', 10, 'Black Person of Color', 'black_person_of_color', 15);

insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'social_status', 'sozialer status', 60, 'Alleinerziehend', 'single_parent', 5);
# --- !Downs

USE adwdoc;

delete from value_lists;
