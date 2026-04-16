const OrderController = require('./OrderController');
// Aquí van a ir agregando los require conforme se vayan haciendo las pruebas
// con los diferentes módulos

test('Top-Down: fase 1', async () => {
  // ---------------------- Fase 1 ----------------------
  // Uso de stub de OrderService
  const orderServiceStub = {
    createOrder: async () => ({
      orderId: 1,
      total: 110,
      transactionId: 999
    })
  };

  // Prueba de OrderController con el stub
  const controller = new OrderController(orderServiceStub);

  const result = await controller.createOrder({
    userId: 1,
    productId: 1,
    quantity: 2,
    price: 50
  });

  console.log(result);

  // Validaciones
  expect(result.status).toBe('success');
  expect(result.data).toBeDefined();

  // ---------------------- Fase 2 ----------------------
  // Agrego ejemplo del stub del users

  // Aquí deben completar los demás stubs:
  // inventoryStub
  // pricingStub
  // paymentStub
  // notificationStub

  // Termiando nivel 2, comenzamos nivel 3, les agrego un ejemplo de
  // OrderService, en este caso se nombra orderService3 porque ya se ha
  // usado previamente un orderService y un orderService 2 en niveles previos

    // ---------------------- Fase 3 ----------------------


  //Terminando nivel 3, comienzan aquí nivel 4 en donde NO se usa ningún stub

    // ---------------------- Fase 4 ----------------------

});