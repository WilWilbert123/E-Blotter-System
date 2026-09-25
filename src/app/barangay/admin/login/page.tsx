import { LoginForm } from '@/components/auth/login-form';

export default function BarangayLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm role="barangay" />
    </div>
  );
}
