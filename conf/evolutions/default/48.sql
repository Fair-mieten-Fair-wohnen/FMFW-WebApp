# --- database schema

# --- !Ups

USE adwdoc;

update `value_lists_ext` set `sub_label`='Diskriminierung von Romn*ija und Sint*izze' where `sub_key`='antiziganistic_discrimination';

# --- !Downs

USE adwdoc;
