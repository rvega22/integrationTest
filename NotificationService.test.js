const NotificationService = require('./NotificationService');

describe('NotificationService', () => {
    let service;
    beforeEach(() => {
        service = new NotificationService();
    });

    test("Send notification", async () => {
        const result = await service.sendNotification('Karim', 'Hola Karim como estas?');
        expect(result).toEqual({ status: 'sent' });
    });

    test("Invalid notification", async () => {
        await expect(service.sendNotification('Karim', '')).rejects.toThrow('Invalid notification');
    });
});