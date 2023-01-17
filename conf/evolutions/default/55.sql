
# --- database schema

# --- !Ups

USE adwdoc;

update value_lists set `listtype`='goal_person_concerned' where `listtype` = 'goal_person_concerned ';

update value_lists set `label`='Nachbarschaftsverhältnis verbessern' where `key`='Improvement_neighborly_coexistence' and `listtype` = 'goal_person_concerned';
update value_lists set `label`='Nachbarschaftsverhältnis verbessert' where `key`='Improvement_neighborly_coexistence' and `listtype` = 'outcome';

# --- !Downs

USE adwdoc;
