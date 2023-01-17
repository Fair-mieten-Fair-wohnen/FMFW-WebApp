
# --- database schema

# --- !Ups

USE adwdoc;

delete from value_lists where `key`='lads';
delete from value_lists where `key`='harassment_verbal_attacks';
delete from value_lists where `key`='Information_to_higher_hieraran_of_accused';
delete from value_lists where `key`='Cooperation/refernce_to';
delete from value_lists where `key`='support_sentencing';
delete from value_lists where `key`='legal_support';
delete from value_lists where `key`='legal_aid_request';
delete from value_lists where `key`='complaint_withdrawn';

delete from value_lists_ext where `sub_key`='unemployment';
# --- !Downs

USE adwdoc;
