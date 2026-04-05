const InventoryService = require('./InventoryService');

describe('InventoryService', () => {
    let service;

    beforeEach(() => {
        service = new InventoryService();
    });

    test("Stock available", () => {
        const result = service.checkStock(1, 10);
        expect(result).toBe(true);
    });

    test("Nonexistent product", () => {
        expect(() => service.checkStock(999, 5)).toThrow('Product not found');
    });

    test("Reduce stock", () => {
        service.reduceStock(1, 3);
        expect(service.stock[1].quantity).toBe(7);
    });

    test("Reduce stock insufficient", () => {
        expect(() => service.reduceStock(1, 100)).toThrow('Insufficient stock');
    });
});