const UserService = require('./UserService');
const InventoryService = require('./InventoryService');
const PricingService = require('./PricingService');
const PaymentService = require('./PaymentService');
const NotificationService = require('./NotificationService');
const OrderService = require('./OrderService');

test('Bottom-Up: en proceso', async () => {
  //Constantes para probar modulos
  const user = new UserService();
  const inventory = new InventoryService();
  const pricing = new PricingService();
  const payment = new PaymentService();
  const notification = new NotificationService();
  const orderService = new OrderService(user, inventory, pricing, payment, notification);

  //Validar usuario
  const userResult = user.validateUser(1);

  //Validar stock
  const stock = inventory.checkStock(1, 2);

  //Verificar que el precio final se calcule correctamente 
  const finalPrice = pricing.calculateFinalPrice(300, 1);

  //Verificar que el pago se procese correctamente
  const paymentResult = await payment.processPayment(finalPrice);

  //Verificar que el inventario se reduzca en el momento correcto del flujo
  if (paymentResult.status === 'success') {
    inventory.reduceStock(1, 2);
  }

  //Verificar que se envíe la notificación
  const notificationResult = await notification.sendNotification(1, 'Order created');

  //Crear una orden con datos válidos (verificar que la orden se genere correctamente).
  const orderResult = await orderService.createOrder(1, 2, 2, 300);

  let invalidUserError;
  let insufficientStockError;

  //Intentar crear una orden con usuario inválido (verificar que el sistema genere error).
  try {
    await orderService.createOrder(999, 1, 2, 300);
  } catch (error) {
    invalidUserError = error.message;
  }

  //Intentar crear una orden sin stock suficiente (verificar que el sistema genere error).
  try {
    await orderService.createOrder(1, 1, 10, 300);
  } catch (error) {
    insufficientStockError = error.message;
  }

  //Analizamos resultados que arrojan las pruebas
  console.log(userResult);
  console.log(stock);
  console.log(finalPrice);
  console.log(paymentResult.status);
  console.log(inventory.stock[1].quantity); 
  console.log(notificationResult.status); 
  console.log(orderResult);
  console.log(invalidUserError);
  console.log(insufficientStockError);

  //Aquí validamos que ambos módulos funcionan correctamente
  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
  expect(finalPrice).toBe(280.5);
  expect(paymentResult.status).toBe('success');
  expect(inventory.stock[1].quantity).toBe(8);
  expect(notificationResult.status).toBe('sent');
  expect(orderResult.orderId).toBeDefined();
  expect(invalidUserError).toBe('User not found');
  expect(insufficientStockError).toBe('Out of stock');
});