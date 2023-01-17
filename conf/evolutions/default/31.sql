
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists_ext set `sub_label`='Haushaltsstruktur' where `sub_key`='family_status';

# --- !Downs

USE adwdoc;
