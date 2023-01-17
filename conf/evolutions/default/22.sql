
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists set `label`='Diskriminierungsbeschwerde verschickt' where `key`='discrimination_ccomplaint';

# --- !Downs

USE adwdoc;

delete from value_lists;
