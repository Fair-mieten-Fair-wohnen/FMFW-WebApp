
# --- database schema

# --- !Ups

USE adwdoc;

delete from column_names where `ref`='institution';
delete from column_names where `ref`='responsible_institution';

insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Trä&shy;;ger / Ins&shy;;ti&shy;;tu&shy;;tion', 'responsible_institution', 'string', 30);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Externer Trä&shy;;ger / Ins&shy;;ti&shy;;tu&shy;;tion', 'external_incident', 'boolean', 35);
# --- !Downs

USE adwdoc;
