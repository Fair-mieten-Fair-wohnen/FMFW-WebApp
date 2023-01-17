# --- database schema

# --- !Ups

USE adwdoc;

INSERT INTO `aggs` (`aggr_id`, `param_key1`, `param_key2`, `order`, `title`, `sub_title`, `description`,
                    `population_type`)
VALUES ('agg_incident_date_year', 'incident_date_year', '', 17, 'Jahr des Vorfalls',
        'Wann hat die Diskriminierung stattgefunden?', 'Wann hat die Diskriminierung stattgefunden?', 'MF');

INSERT INTO `agg_params` (`param_key`, `aggr_type`, `path`, `is_Array`, `data_ref`, `value_list`)
VALUES ('incident_date_year', 'date_year', 'short_description', 0, 'incident_date', '');

# --- !Downs

USE adwdoc;

delete
from `aggs`
where `aggr_id` = 'agg_incident_date_year';
delete
from `agg_params`
where `param_key` = 'incident_date_year';
