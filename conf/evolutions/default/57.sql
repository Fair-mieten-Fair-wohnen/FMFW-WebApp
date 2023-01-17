# --- database schema

# --- !Ups

USE adwdoc;

alter table `archive_job`
    add COLUMN `agg_year` int;
update `archive_job`
set `agg_year` = 1;

# --- !Downs

USE adwdoc;

alter table `archive_job`
    DROP
        COLUMN IF EXISTS agg_year;
