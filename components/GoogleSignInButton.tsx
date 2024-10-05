'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn('google', { callbackUrl: '/generate' })}
      className="w-full"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  )
}