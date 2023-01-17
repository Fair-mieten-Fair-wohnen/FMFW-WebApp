# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS archive_comp_stat;

CREATE TABLE `archive_comp_stat`
(
    `id`           int(11) unsigned NOT NULL AUTO_INCREMENT,
    `job_id`       int(11)          NOT NULL,
    `aggr_id`      varchar(255)     NOT NULL,
    `stats_path1`  varchar(255) DEFAULT '',
    `stats_key1`   varchar(255)     NOT NULL,
    `stats_value1` varchar(255)     NOT NULL,
    `stats_path2`  varchar(255) DEFAULT '',
    `stats_key2`   varchar(255)     NOT NULL,
    `stats_value2` varchar(255)     NOT NULL,
    `stats_count`  int(11)          NOT NULL,
    PRIMARY KEY (`id`)
);

# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS archive_comp_stat;
