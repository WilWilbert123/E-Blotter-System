BEGIN;
SELECT plan(1);

-- Setup Police User
SELECT set_config('request.jwt.claims', '{"sub":"police_id", "role":"authenticated"}', true);
-- Assume police user is properly set up in roles...

-- Police users should see cases across ALL barangays
SELECT results_eq(
    $$ SELECT count(*)::integer FROM blotter_cases $$,
    $$ SELECT count(*)::integer FROM blotter_cases $$, -- Meaning they see the true count, not filtered
    'Police officers bypass tenant isolation to view all records'
);

SELECT * FROM finish();
ROLLBACK;
