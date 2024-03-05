'use client';

import { Field, FieldError, GlobalError, Input, Label } from '@clerk/elements/common';
import { Navigate, SignIn, SocialProvider, Step, StrategyOption, Verification } from '@clerk/elements/sign-in';
import Link from 'next/link';
import { type ComponentProps, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import Metamask from '@/assets/metamask';
import { H1, H3, P } from '@/components/design';
import { CustomField, CustomSubmit } from '@/components/form';

function ActiveSocialProviders() {
  return (
    <>
      <SocialProvider
        className='text-[rgb(243,243,243)] border-[rgb(37,37,37)] hover:border-[rgb(50,50,50)] [&>svg]:absolute [&>svg]:left-4 [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:opacity-60 [&>svg]:hover:opacity-90 relative flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border bg-[rgb(22,22,22)] hover:bg-[rgb(22,22,30)] text-sm transition-all duration-150'
        name='github'
      >
        <FaGithub size='1.25em' />
        <span className='leading-loose'>Continue with GitHub</span>
      </SocialProvider>

      <SocialProvider
        className='text-[rgb(243,243,243)] border-[rgb(37,37,37)] hover:border-[rgb(50,50,50)] [&>svg]:absolute [&>svg]:left-4 [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:opacity-60 [&>svg]:hover:opacity-90 relative flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border bg-[rgb(22,22,22)] hover:bg-[rgb(22,22,30)] text-sm transition-all duration-150'
        name='google'
      >
        <FaGoogle size='1.25em' />
        <span className='leading-loose'>Continue with Google</span>
      </SocialProvider>

      <SocialProvider
        className='text-[rgb(243,243,243)] border-[rgb(37,37,37)] hover:border-[rgb(50,50,50)] [&>svg]:absolute [&>svg]:left-4 [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:opacity-60 [&>svg]:hover:opacity-90 relative flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border bg-[rgb(22,22,22)] hover:bg-[rgb(22,22,30)] text-sm transition-all duration-150'
        name='metamask'
      >
        <Metamask
          height='1.25em'
          width='1.25em'
        />
        <span className='leading-loose'>Continue with Metamask</span>
      </SocialProvider>
    </>
  );
}

function TextButton({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className='m-0 py-3 px-6 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-[rgb(204,204,204)] text-center w-full'
      {...props}
    >
      {children}
    </button>
  );
}

function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className='text-[rgb(243,243,243)] border-[rgb(37,37,37)] hover:border-[rgb(50,50,50)] [&>img]:opacity-80  [&>img]:hover:opacity-100 [&>img]:grayscale [&>img]:hover:grayscale-0 relative flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border bg-[rgb(22,22,22)] hover:bg-[rgb(22,22,30)] text-sm transition-all duration-150'
      {...props}
    >
      {children}
    </button>
  );
}

export default function SignInPage() {
  const [continueWithEmail, setContinueWithEmail] = useState(false);

  return (
    <SignIn>
      <div className='h-dvh flex flex-col justify-center items-center bg-zinc-950 text-white gap-10'>
        <div className='text-center'>
          <H1>Sign In</H1>
          <p className='text-base text-zinc-400'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='no-underline hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>

        <Step name='start'>
          <div className='flex flex-col items-center  gap-12 w-96'>
            <GlobalError className='block text-red-400 font-mono' />

            <div className='flex flex-col gap-2 self-stretch'>
              <ActiveSocialProviders />
            </div>

            {continueWithEmail ? (
              <>
                <Field
                  className='flex flex-col gap-4 w-full'
                  name='identifier'
                >
                  <Label className='sr-only'>Email</Label>
                  <Input
                    className='bg-[rgb(12,12,12)] border-[rgb(37,37,37)] border rounded data-[invalid=true]:border-red-400 w-full placeholder-[rgb(100,100,100)] px-4 py-2'
                    placeholder='Enter your email address'
                  />
                  <FieldError className='block text-red-400 font-mono w-full' />
                </Field>

                <CustomSubmit>Sign in with Email</CustomSubmit>
              </>
            ) : (
              <TextButton onClick={() => setContinueWithEmail(true)}>Continue with Email</TextButton>
            )}
          </div>
        </Step>

        <Step name='choose-strategy'>
          <div className='flex flex-col items-center  gap-6 w-96'>
            <ActiveSocialProviders />

            <StrategyOption
              asChild
              name='reset_password_email_code'
            >
              <Button>Reset Password</Button>
            </StrategyOption>

            <StrategyOption
              asChild
              name='password'
            >
              <Button>Password</Button>
            </StrategyOption>

            <StrategyOption
              asChild
              name='phone_code'
            >
              <Button>Send a code to your phone</Button>
            </StrategyOption>

            <StrategyOption
              asChild
              name='email_code'
            >
              <Button>Send a code to your email</Button>
            </StrategyOption>

            <Navigate
              asChild
              to='previous'
            >
              <TextButton>Go back</TextButton>
            </Navigate>
          </div>
        </Step>

        <Step name='verifications'>
          <div className='flex gap-6 flex-col'>
            <GlobalError className='block text-red-400 font-mono' />

            <Verification name='password'>
              <CustomField
                label='Password'
                name='password'
              />

              <CustomSubmit>Verify</CustomSubmit>
            </Verification>

            <Verification name='email_code'>
              <CustomField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                autoSubmit
                label='Email Code'
                name='code'
              />

              <CustomSubmit>Verify</CustomSubmit>
            </Verification>

            <Verification name='phone_code'>
              <CustomField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                autoSubmit
                label='Phone Code'
                name='code'
              />

              <CustomSubmit>Verify</CustomSubmit>
            </Verification>

            <Verification name='reset_password_email_code'>
              <H3>Verify your email</H3>

              <P>Please check your email for a verification code...</P>
            </Verification>
          </div>

          <Navigate
            asChild
            to='choose-strategy'
          >
            <TextButton>Use another method</TextButton>
          </Navigate>
        </Step>
      </div>
    </SignIn>
  );
}
