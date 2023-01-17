
# --- database schema

# --- !Ups

USE adwdoc;

delete from column_names;

insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Fallnummer", "incident_number", 'string', 10);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Datum der Meldung", "creation_date", 'date', 20);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Träger/Institution", "institution", 'string', 30);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Berater*in", "consultant", 'string', 40);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Vorgang", "type", 'type', 50);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Bearbeitung", "access_rights", 'icon-list', 100);

# --- !Downs

USE adwdoc;

delete from column_names;