export interface User {
    id: number;
    name: string;
}

const users = [
    {
        id: 123,
        name: "John Doe"
    },
    {
        id: 1234,
        name: "Jane Doe"
    },
    {
        id: 1235,
        name: "Doe Rae"
    },
    {
        id: 12365,
        name: "Roscoe Jones"
    },
    {
        id: 123425,
        name: "Denna Dog"
    },
    {
        id: 123512,
        name: "Marble Cat"
    },
]

export const getUser = async (authCookie: string): Promise<User> => {
    return users[Math.floor(Math.random()*users.length)]
}

export const getAllUsers = async (): Promise<User[]> => {
    return [
        users[Math.floor(Math.random()*users.length)],
        users[Math.floor(Math.random()*users.length)],
        users[Math.floor(Math.random()*users.length)]
    ]
}