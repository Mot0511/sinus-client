export default interface UserRead {
    id: string
    username: string
    name: string
    email: string
    description: string
    friends: string
    avatar: string
    is_active: number
    is_superuser: number
    is_verified: number
}