
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `key`='information_to_accused';

# --- !Downs

USE adwdoc;

delete from value_lists;
