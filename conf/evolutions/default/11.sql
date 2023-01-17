
# --- database schema

# --- !Ups

USE adwdoc;

delete from column_names;

insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Fall&shy;;num&shy;;mer", "incident_number", 'string', 10);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "er&shy;;zeugt am", "creation_date", 'date', 20);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Trä&shy;;ger / Ins&shy;;ti&shy;;tu&shy;;tion", "institution", 'string', 30);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Be&shy;;ra&shy;;ter*in", "consultant", 'string', 40);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Vor&shy;;gang", "type", 'type', 50);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "letz&shy;;te Än&shy;;de&shy;;rung am", "lastupdated_date", 'date', 60);
insert into column_names (`table_name`, `label`, `ref`, `type`, `weight`) values ("incidents", "Be&shy;;ar&shy;;bei&shy;;tung", "access_rights", 'icon-list', 100);

# --- !Downs

USE adwdoc;

delete from column_names;