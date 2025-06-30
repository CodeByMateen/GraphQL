import { PaymentStatus } from "@prisma/client";
import prisma from "../prisma/prisma";

export const createPayment = async (userId: number, amount: number, status: PaymentStatus, method: string) => {
    return await prisma.payment.create({
        data: { userId, amount, status, method },
    });
};

export const getAllPayments = async () => {
    return await prisma.payment.findMany({
        include: { user: true },
    });
};

export const createMultiplePayments = async () => {
    const paymentMethods = ['paypal', 'credit_card', 'american_express', 'debit_card', 'bank_transfer', 'apple_pay', 'google_pay'];
    const paymentStatuses: PaymentStatus[] = ['PENDING', 'COMPLETED', 'FAILED'];
    const payments = [];

    for (let i = 1; i <= 150; i++) {
        const randomUserId = Math.floor(Math.random() * 50) + 1; // Random user ID between 1-50
        const randomAmount = Math.floor(Math.random() * 10000) + 100; // Random amount between 100-10100
        const randomMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const randomStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
        
        // Random date within last 30 days
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

        const payment = await prisma.payment.create({
            data: {
                userId: randomUserId,
                amount: randomAmount,
                status: randomStatus,
                paymentDate: randomDate,
                method: randomMethod,
            },
            include: {
                user: true,
            },
        });
        payments.push(payment);
    }
    return payments;
};

