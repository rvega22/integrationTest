const PaymentService = require('./PaymentService');

describe('PaymentService', () => {
    let service;

    beforeEach(() => {
        service = new PaymentService();
    });

    test("Valid payment", async () => {
        const result = await service.processPayment(100);

        expect(result.status).toBe('success');
        expect(result.transactionId).toBeDefined();
    });

    test("Invalid payment (zero)", async () => {
        const result = await service.processPayment(0);

        expect(result.status).toBe('error');
    });
});