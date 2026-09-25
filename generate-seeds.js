const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'supabase', 'seed');

const seedData = {
  '001_roles.sql': `
INSERT INTO roles (name, description) VALUES
('POLICE_SUPER_ADMIN', 'Highest administrative authority'),
('POLICE_OFFICER', 'Police operational user'),
('BARANGAY_CAPTAIN', 'Barangay administrator'),
('BARANGAY_STAFF', 'Barangay staff');
`,
  '002_permissions.sql': `
INSERT INTO permissions (name, description) VALUES
('MANAGE_BARANGAYS', 'Create and edit barangays'),
('MANAGE_USERS', 'Create and edit users'),
('VIEW_ALL_BLOTTERS', 'View blotters from all barangays'),
('VIEW_OWN_BLOTTERS', 'View blotters from own barangay'),
('CREATE_BLOTTER', 'Create a new blotter case');
`,
  '003_irosin-barangays.sql': `
INSERT INTO barangays (name, official_display_name) VALUES
('Bacolod', 'Barangay Bacolod'),
('Bagsac', 'Barangay Bagsac'),
('Batang', 'Barangay Batang'),
('Bolos', 'Barangay Bolos'),
('Buenavista', 'Barangay Buenavista'),
('Bulawan', 'Barangay Bulawan'),
('Carriedo', 'Barangay Carriedo'),
('Casini', 'Barangay Casini'),
('Cawayan', 'Barangay Cawayan'),
('Cogon', 'Barangay Cogon'),
('Gabao', 'Barangay Gabao'),
('Gulang-Gulang', 'Barangay Gulang-Gulang'),
('Gumapia', 'Barangay Gumapia'),
('Iligan', 'Barangay Iligan'),
('Liang', 'Barangay Liang'),
('Macawayan', 'Barangay Macawayan'),
('Mapaso', 'Barangay Mapaso'),
('Monbon', 'Barangay Monbon'),
('Patag', 'Barangay Patag'),
('Salvacion', 'Barangay Salvacion'),
('San Agustin', 'Barangay San Agustin'),
('San Isidro', 'Barangay San Isidro'),
('San Julian', 'Barangay San Julian'),
('San Pedro', 'Barangay San Pedro'),
('Santo Niño', 'Barangay Santo Niño'),
('Tabon-Tabon', 'Barangay Tabon-Tabon'),
('Tinampo', 'Barangay Tinampo'),
('Tulay', 'Barangay Tulay');
`,
  '004_system-settings.sql': `
INSERT INTO system_settings (key, value, description) VALUES
('REQUIRE_PASSWORD_CHANGE_ON_RESET', 'true', 'Require password change after admin reset'),
('MAX_LOGIN_ATTEMPTS', '5', 'Maximum login attempts before lockout');
`
};

for (const [filename, content] of Object.entries(seedData)) {
  fs.writeFileSync(path.join(seedPath, filename), content.trim() + '\\n');
}

console.log('Seed files generated.');
