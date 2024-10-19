export default function isAllowedUserType(userType: string | undefined, allowedUserTypes: string[]): boolean {
    return typeof userType === 'string' && allowedUserTypes.includes(userType);
}