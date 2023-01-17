# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS value_lists;

CREATE TABLE `value_lists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL DEFAULT '',
  `listtype` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) NOT NULL DEFAULT '',
  `weight` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `list_type_idx` (`listtype`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4;

# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS value_lists;

