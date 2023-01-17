# --- database schema

# --- !Ups

USE
    adwdoc;

DROP TABLE IF EXISTS stats_key;

CREATE TABLE `stats_key`
(
    `id`         int(11) unsigned NOT NULL AUTO_INCREMENT,
    `stats_type` varchar(50)      NOT NULL DEFAULT '',
    `stats_key`  varchar(255)     NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
);

# --- !Downs
USE
    adwdoc;

DROP TABLE IF EXISTS stats_key;
