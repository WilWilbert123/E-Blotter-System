BEGIN;
SELECT plan(1);

-- Admin should have access to system logs and user profiles
SELECT set_config('request.jwt.claims', '{"sub":"admin_id", "role":"authenticated"}', true);

SELECT lives_ok(
    $$ SELECT * FROM audit_logs $$,
    'Super Admin can query secure audit_logs table'
);

SELECT * FROM finish();
ROLLBACK;
