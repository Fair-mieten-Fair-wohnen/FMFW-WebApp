
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists_ext set `label`='Anderes' where `listtype`='grounds_of_discrimination' and `key`='other';

update value_lists_ext set `sub_label`='anderes (rass. Diskr. ethn. Herkunft)' where `listtype`='grounds_of_discrimination' and `key`='racist_discrimination_ethnic_origin' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (Geschlecht)' where `listtype`='grounds_of_discrimination' and `key`='Gender' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (sexuelle Identität)' where `listtype`='grounds_of_discrimination' and `key`='sexuell_identity' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (Religion, Weltanschauung)' where `listtype`='grounds_of_discrimination' and `key`='religion_weltanschauung' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (Behinderung)' where `listtype`='grounds_of_discrimination' and `key`='disability' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (Lebensalter)' where `listtype`='grounds_of_discrimination' and `key`='age' and `sub_key` = 'other';
update value_lists_ext set `sub_label`='anderes (sozialer Status)' where `listtype`='grounds_of_discrimination' and `key`='social_status' and `sub_key` = 'other';

# --- !Downs

USE adwdoc;

