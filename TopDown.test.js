const OrderController = require('./OrderController');



test('Top-Down: Terminado', async () => {

  // ---------------------- Fase 1 ----------------------
  // Stub de OrderService
  const orderServiceStub = {
    createOrder: async () => ({
      orderId: 1,
      total: 110,
      transactionId: 999
    })
  };

  const controller = new OrderController(orderServiceStub);

  const result = await controller.createOrder({
    userId: 1,
    productId: 1,
    quantity: 2,
    price: 50
  });

  console.log(result);

  expect(result.status).toBe('success');
  expect(result.data).toBeDefined();
  expect(result.data.orderId).toBeDefined();
  expect(result.data.total).toBeDefined();
  expect(result.data.transactionId).toBeDefined();


  // ---------------------- Fase 2 ----------------------
  // Stubs internos

  const userStub = {
    validateUser: () => ({ valid: true })
  };

  const inventoryStub = {
    checkStock: () => true,
    reduceStock: () => {}
  };

  const pricingStub = {
    calculateFinalPrice: () => 200
  };

  const paymentStub = {
    processPayment: async () => ({
      status: 'success',
      transactionId: 123
    })
  };

  const notificationStub = {
    sendNotification: async () => ({ status: 'sent' })
  };

  const orderService2 = new OrderService(
    userStub,
    inventoryStub,
    pricingStub,
    paymentStub,
    notificationStub
  );

  const controller2 = new OrderController(orderService2);

  const result2 = await controller2.createOrder({
    userId: 1,
    productId: 1,
    quantity: 2,
    price: 50
  });

  console.log(result2);

  expect(result2.status).toBe('success');
  expect(result2.data.orderId).toBeDefined();
  expect(result2.data.total).toBe(200);
  expect(result2.data.transactionId).toBe(123);


  // ---------------------- Fase 3 ----------------------
  // Integración parcial (módulos reales + stubs)

  const userReal = new UserService();
  const inventoryReal = new InventoryService();
  const pricingReal = new PricingService();

  const paymentStub2 = {
    processPayment: async () => ({
      status: 'success',
      transactionId: 555
    })
  };

  const notificationStub2 = {
    sendNotification: async () => ({ status: 'sent' })
  };

  const orderService3 = new OrderService(
    userReal,
    inventoryReal,
    pricingReal,
    paymentStub2,
    notificationStub2
  );

  const controller3 = new OrderController(orderService3);

  const result3 = await controller3.createOrder({
    userId: 1,
    productId: 1,
    quantity: 1,
    price: 300
  });

  console.log(result3);

  expect(result3.status).toBe('success');
  expect(result3.data.total).toBeDefined();


  // ---------------------- Fase 4 ----------------------
  // Sistema completo (TODO real)

  const orderService4 = new OrderService(
    new UserService(),
    new InventoryService(),
    new PricingService(),
    new PaymentService(),
    new NotificationService()
  );

  const controller4 = new OrderController(orderService4);

  const result4 = await controller4.createOrder({
    userId: 1,
    productId: 1,
    quantity: 1,
    price: 300
  });

  console.log(result4);

  expect(result4.status).toBe('success');
  expect(result4.data.orderId).toBeDefined();
  expect(result4.data.total).toBeDefined();
  expect(result4.data.transactionId).toBeDefined();

});