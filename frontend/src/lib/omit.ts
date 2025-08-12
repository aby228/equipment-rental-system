export function omit<User extends Record<string, any>, Key extends keyof User>(
   user: User,
   keys: Key[]
): Omit<User, Key> {
   const result = { ...user }
   for (let key of keys) {
      delete result[key]
   }
   return result
}
