'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/features/auth/schemas';
import { loginAction } from '@/features/auth/actions';

export function LoginForm({ role }: { role: 'police' | 'barangay' }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    const result = await loginAction(data);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{role === 'police' ? 'Police Admin Login' : 'Barangay Admin Login'}</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium">Username or Email</label>
        <input {...register('username')} className="mt-1 block w-full border rounded p-2" />
        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" {...register('password')} className="mt-1 block w-full border rounded p-2" />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white rounded p-2 mt-4 hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
