BEGIN;
SELECT plan(2);

-- Test any custom security definer functions or trigger logic here
SELECT has_function('public', 'audit_action', 'Audit trigger function exists');

-- Test that the trigger is attached to the tables
SELECT trigger_is('public', 'blotter_cases', 'trigger_blotter_audit', 'blotter_cases table has audit trigger');

SELECT * FROM finish();
ROLLBACK;
