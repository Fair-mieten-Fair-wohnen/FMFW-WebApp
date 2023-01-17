# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS column_whitelist;

CREATE TABLE `column_whitelist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `column_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into column_whitelist (column_name) values ("incident_number");
insert into column_whitelist (column_name) values ("creation_date");
insert into column_whitelist (column_name) values ("lastupdated_date");
insert into column_whitelist (column_name) values ("institution");

# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS column_whitelist;