import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoginCredentials } from '@/types'
import toast from 'react-hot-toast'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>()

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Username"
        type="text"
        autoComplete="username"
        {...register('username', { required: 'Username is required' })}
        error={errors.username?.message}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign in
      </Button>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Demo credentials</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              handleSubmit(onSubmit)({
                username: 'admin',
                password: 'admin123',
              } as LoginCredentials)
            }}
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              handleSubmit(onSubmit)({
                username: 'user',
                password: 'user123',
              } as LoginCredentials)
            }}
          >
            User
          </Button>
        </div>
      </div>
    </form>
  )
}