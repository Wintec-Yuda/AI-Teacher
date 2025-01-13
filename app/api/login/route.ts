// app/api/login/route.ts
import authService from '@/app/lib/firebase/authServices';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const result = await authService.login(email, password);
  
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  
    return NextResponse.json({ 
      status: "success",
      data: result.user, 
      message: result.message
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      status: "error",
      message: "Internal Server Error" 
    }, { status: 500 });
  }
}
