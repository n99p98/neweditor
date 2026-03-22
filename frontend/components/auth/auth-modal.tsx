'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ name: z.string().optional(), email: z.string().email(), password: z.string().min(8) });

export function AuthModal({ mode = 'login' }: { mode?: 'login' | 'register' | 'reset' }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="panel w-full max-w-md p-6">
      <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[.18em] text-cyan-200">
        Quick access
      </div>
      <h3 className="mt-4 text-2xl font-semibold capitalize">{mode}</h3>
      <p className="mt-2 text-sm text-slate-400">Create an account to save projects, exports, and orders.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(async () => {})}>
        {mode === 'register' && <input {...register('name')} placeholder="Name" className="input" />}
        <input {...register('email')} placeholder="Email" className="input" />
        <input type="password" {...register('password')} placeholder="Password" className="input" />
        {Object.values(errors)[0] && <p className="text-sm text-rose-300">{Object.values(errors)[0]?.message as string}</p>}
        <button className="button-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : 'Continue'}
        </button>
        <button type="button" className="button-secondary w-full">
          Continue with Google
        </button>
      </form>
    </div>
  );
}
