
# --- database schema

# --- !Ups

USE adwdoc;
delete from value_lists_ext where `key`='appearance' and `sub_key` = 'others';
insert into value_lists_ext (`listtype`, `key`, `label`, `weight`, `sub_label`, `sub_key`, `sub_weight`) values ('grounds_of_discrimination', 'appearance', 'Äußere Erscheinungsform', 70, 'anderes (äußere Erscheinungsform)', 'other', 100);

# --- !Downs

USE adwdoc;
