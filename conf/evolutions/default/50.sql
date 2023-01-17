
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists_ext set `weight`='50' where `key`='disability';
update value_lists_ext set `weight`='60' where `key`='age';
update value_lists_ext set `weight`='70' where `key`='social_status';

# --- !Downs

USE adwdoc;

