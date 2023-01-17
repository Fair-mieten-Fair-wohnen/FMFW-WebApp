# --- database schema

# --- !Ups

USE
    adwdoc;

insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.affected_group');

insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'affected_person.number_of_children');

insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'generaldata.advise_language');

insert into stats_key (`stats_type`, `stats_key`)
values ('simple', 'generaldata.become_aware_of');

# --- !Downs

USE
    adwdoc;
