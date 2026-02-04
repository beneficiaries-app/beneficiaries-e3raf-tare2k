export const RegisterStatus = {
    PENDING: 'PENDING',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
} as const;

export type RegisterStatusType = typeof RegisterStatus[keyof typeof RegisterStatus];