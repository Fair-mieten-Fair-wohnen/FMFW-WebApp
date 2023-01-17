# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS column_names;

CREATE TABLE `column_names` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) NOT NULL DEFAULT '',
  `ref` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(255) NOT NULL DEFAULT '',
  `weight` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `table_name_idx` (`table_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS column_names;