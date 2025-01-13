// app/middleware.ts
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import auth from './lib/firebase/firebase';

export function middleware(req: Request) {
  const { token } = req.cookies;
  const user = getAuth(auth).currentUser;

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
