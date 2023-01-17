# --- database schema

# --- !Ups

USE
adwdoc;

DROP TABLE IF EXISTS value_lists_ext;

CREATE TABLE `value_lists_ext`
(
  `id`         int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key`        varchar(255) NOT NULL DEFAULT '',
  `listtype`   varchar(255) NOT NULL DEFAULT '',
  `label`      varchar(255) NOT NULL DEFAULT '',
  `weight`     int(11) NOT NULL DEFAULT 0,
  `sub_label`  varchar(255) NOT NULL DEFAULT '',
  `sub_key`    varchar(255) NOT NULL DEFAULT '',
  `sub_weight` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY          `list_type_idx` (`listtype`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4;

# --- !Downs

USE
adwdoc;

DROP TABLE IF EXISTS value_lists_ext;

