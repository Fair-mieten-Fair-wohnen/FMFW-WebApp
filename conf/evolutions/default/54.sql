
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists_ext set `key`='racist_discrimination_ethnic_origin' where `key`='racist_discrimination_ethnic_origin ';

# --- !Downs

USE adwdoc;
