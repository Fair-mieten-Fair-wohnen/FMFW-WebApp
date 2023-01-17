# --- database schema

# --- !Ups

USE adwdoc;

update agg_params set `path`='process_blog_part1' where `path`='process_blog_part2';

# --- !Downs

USE adwdoc;

delete
from agg_params;
