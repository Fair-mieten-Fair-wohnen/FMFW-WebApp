# --- database schema

# --- !Ups

USE adwdoc;

delete
from `aggs`
where `aggr_id` = 'agg_institution';
delete
from `aggs`
where `aggr_id` = 'agg_responsible_institution';
delete
from `agg_params`
where `param_key` = 'institution';
delete
from `agg_params`
where `param_key` = 'responsible_institution';

INSERT INTO `aggs` (`aggr_id`, `param_key1`, `param_key2`, `order`, `title`, `sub_title`, `description`,
                    `population_type`)
VALUES ('agg_responsible_institution', 'responsible_institution', '', 10, 'Träger / Institution',
        'Wie viele Fälle hat welche Institution eingetragen?', '', 'AMF');

INSERT INTO `agg_params` (`param_key`, `aggr_type`, `path`, `is_Array`, `data_ref`, `value_list`)
VALUES ('responsible_institution', 'simple', 'metadata', 0, 'responsible_institution', 'responsible_institution');

# --- !Downs

USE adwdoc;
