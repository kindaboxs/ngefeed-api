import type { auth } from '@/lib/auth/index';

export type User = typeof auth.$Infer.Session.user
export type Session = typeof auth.$Infer.Session.session
