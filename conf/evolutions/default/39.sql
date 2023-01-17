
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `listtype`='responsible_institution';

insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'adb', 'ADB', 10);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'ads', 'ADS', 20);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'amaro_foro', 'Amaro Foro', 30);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'berliner_mieterverein', 'Berliner Mieterverein', 40);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'berliner_register', 'Berliner-Register', 50);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'eoto', 'EOTO', 60);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'fmfw_fachstelle', 'FMFW-Fachstelle', 70);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'hestia', 'Hestia', 80);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'inssan', 'INSSAN', 90);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'lads', 'LADS', 100);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'schwulenberatung', 'Schwulenberatung', 110);
insert into value_lists (`listtype`, `key`, `label`, `weight`) values ('responsible_institution', 'other', 'anderes', 200);

delete from column_names;

insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Fall&shy;;num&shy;;mer', 'incident_number', 'string', 10);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'er&shy;;zeugt am', 'creation_date', 'date', 20);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Trä&shy;;ger / Ins&shy;;ti&shy;;tu&shy;;tion', 'institution', 'string', 30);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Be&shy;;ra&shy;;ter*in', 'consultant', 'string', 40);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Vor&shy;;gang', 'type', 'type', 50);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'letz&shy;;te Än&shy;;de&shy;;rung am', 'lastupdated_date', 'date', 60);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Be&shy;;ar&shy;;bei&shy;;tung', 'access_rights', 'icon-list', 100);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ('incidents', 'Externer Trä&shy;;ger / Ins&shy;;ti&shy;;tu&shy;;tion', 'responsible_institution', 'string', 35);

# --- !Downs

USE adwdoc;
