# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS archive_job;

CREATE TABLE `archive_job`
(
    `id`            int(11) unsigned NOT NULL AUTO_INCREMENT,
    `job_timestamp` datetime         NOT NULL,
    `job_finished`  tinyint(1)       NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS archive_stat;

CREATE TABLE `archive_stat`
(
    `id`         int(11) unsigned NOT NULL AUTO_INCREMENT,
    `job_id`     int(11)          NOT NULL,
    `stat_path`  varchar(255)     NOT NULL,
    `stat_key`   varchar(255)     NOT NULL,
    `stat_value` int(11)          NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `pathKeyPerJob` (`job_id`, `stat_path`, `stat_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


# --- !Downs

USE adwdoc;
DROP TABLE IF EXISTS archive_job;
DROP TABLE IF EXISTS archive_stat;
