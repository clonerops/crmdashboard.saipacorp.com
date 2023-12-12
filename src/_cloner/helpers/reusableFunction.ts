const checkUserRole = (roles: any, role: string) => {
    let userIsAccess = roles?.includes(role) || roles?.includes("TransSuperAdmin") || roles?.includes("TransAdmin")
    return userIsAccess
}

const getUserRoles = () => {
    const retrievedItem: string | null = localStorage.getItem('auth');
    const retrievedObject: any = retrievedItem ? JSON.parse(retrievedItem) : null;
    return retrievedObject?.userRoles
}

const getRefreshToken = () => {
    const retrievedItem: string | null = localStorage.getItem('auth');
    const retrievedObject: any = retrievedItem ? JSON.parse(retrievedItem) : null;
    return retrievedObject?.refreshToken
}

export const setDateOneWeek = () => {
    let date: any = new Date();
    let oneWeek = date - 1000 * 60 * 60 * 72 * 2;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
    return new Date(oneWeek);
}

export const setDateOneMonth = () => {
    let date: any = new Date();
    let oneMonth = date - 1000 * 60 * 60 * 380 * 2;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
    return new Date(oneMonth);
}
export { checkUserRole, getUserRoles, getRefreshToken }