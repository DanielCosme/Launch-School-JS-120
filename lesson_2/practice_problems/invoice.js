function createInvoice(services) {
  let phone = 3000;
  let internet = 5500;
  
  if (services !== undefined) {
    if (services.phone) phone = services.phone;
    if (services.internet) internet = services.internet;
    phone = (services.phone === 0) ? 0 : phone;
    internet = (services.internet === 0) ? 0 : internet;
  }


  return {
    phone,
    internet,
    payed: 0,

    total() {
      return this.phone + this.internet;
    },

    addPayments(payments) {
      this.payed += payments.reduce((acc, cur) => {
        return acc + cur.total()
      }, 0);
    },

    addPayment(payment) {
      this.payed += payment.total();
    },

    amountDue() {
      console.log(this.total() - this.payed);
    },
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000
 
////////////////////////

function createPayment(services = {}) {

  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || this.phone + this.internet;
    }
  }   
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000


invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0

