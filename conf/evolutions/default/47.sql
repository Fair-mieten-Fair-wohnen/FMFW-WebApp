# --- database schema

# --- !Ups

USE adwdoc;

alter table `archive_job`
    add COLUMN `agg_scope` varchar(20) default 'all';

# --- !Downs

USE adwdoc;

alter table `archive_job`
    DROP COLUMN IF EXISTS agg_scope;
