# --- database schema

# --- !Ups

USE adwdoc;

DROP TABLE IF EXISTS `agg_params`;

CREATE TABLE `agg_params`
(
    `id`         int(11) unsigned NOT NULL AUTO_INCREMENT,
    `param_key`  varchar(255)     NOT NULL,
    `aggr_type`  varchar(255)     NOT NULL,
    `path`       varchar(255) DEFAULT NULL,
    `is_Array`   tinyint(1)       NOT NULL,
    `data_ref`   varchar(255) DEFAULT NULL,
    `value_list` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `paramKey` (`param_key`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  DEFAULT CHARSET = utf8;


DROP TABLE IF EXISTS `aggs`;

CREATE TABLE `aggs`
(
    `id`              int(11) unsigned NOT NULL AUTO_INCREMENT,
    `aggr_id`         varchar(255)     NOT NULL,
    `param_key1`      varchar(255)     NOT NULL,
    `param_key2`      varchar(255) DEFAULT NULL,
    `order`           int(11)          NOT NULL,
    `title`           varchar(255) DEFAULT NULL,
    `sub_title`       varchar(255) DEFAULT NULL,
    `description`     varchar(255) DEFAULT NULL,
    `population_type` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `aggrId` (`aggr_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 52
  DEFAULT CHARSET = utf8;


# --- !Downs

USE adwdoc;

DROP TABLE IF EXISTS `agg_params`;

DROP TABLE IF EXISTS `aggs`;
