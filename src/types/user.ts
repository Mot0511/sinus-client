export default interface UserRead {
    id: string
    username: string
    name: string
    email: string
    description: string
    is_active: number
    is_superuser: number
    is_verified: number
}