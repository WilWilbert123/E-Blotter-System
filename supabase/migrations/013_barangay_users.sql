CREATE TABLE IF NOT EXISTS barangay_users (
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    barangay_id UUID NOT NULL REFERENCES barangays(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, barangay_id)
);
