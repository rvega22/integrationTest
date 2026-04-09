const PricingService = require('./PricingService');

describe('PricingService', () => {
    let service;

    beforeEach(() => {
        service = new PricingService();
    });

    test("Calculate subtotal", () => {
        const result = service.calculateSubtotal(50, 2);
        expect(result).toBe(100);
    });

    test("Calculate tax", () => {
        const result = service.calculateTax(100);
        expect(result).toBe(10);
    });

    test("Apply discount > 200", () => {
        const result = service.applyDiscount(300);
        expect(result).toBe(255);
    });

    test("Calculate final price high discount", () => {
        const result = service.calculateFinalPrice(100, 3);
        expect(result).toBe(280.5);
    });
});