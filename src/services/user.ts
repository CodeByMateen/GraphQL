import prisma from "../prisma/prisma";

export const createUser = async (name: string, email: string, phone?: string) => {
    return await prisma.user.create({
        data: { name, email, phone },
    });
};

export const getUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { payments: true },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: { payments: true },
    });
};

export const createMultipleUsers = async () => {
    const users = [];
    for (let i = 1; i <= 50; i++) {
        const user = await prisma.user.create({
            data: {
                id: i,
                name: `User ${i}`,
                email: `user${i}@example.com`,
                phone: `+92-300-${i.toString().padStart(6, '0')}`,
            },
        });
        users.push(user);
    }
    return users;
};