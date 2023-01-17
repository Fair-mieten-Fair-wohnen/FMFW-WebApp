# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS incidents;

CREATE TABLE IF NOT EXISTS `incidents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `incident_type` varchar(64) NOT NULL,
  `incident` text NOT NULL,
  `created` datetime not null,
  `updated` timestamp not null,
  `institution` varchar(50) not null,
  `owner` varchar(100) not null,
  `update_user` varchar(100) not null,
  PRIMARY KEY (`id`),
  KEY `incident_type_idx` (`incident_type`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS incidents;

