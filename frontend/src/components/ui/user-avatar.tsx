import Image from 'next/image'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  user: {
    name: string
    avatar?: string
  }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  }

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  }

  return (
    <div className={cn(
      'relative rounded-full overflow-hidden border-2 border-white shadow-sm',
      sizeClasses[size],
      className
    )}>
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          width={sizePixels[size]}
          height={sizePixels[size]}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {getInitials(user.name)}
        </div>
      )}
    </div>
  )
}
