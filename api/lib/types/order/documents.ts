const Types = {
    Delivery: 'delivery', // Teslimat Belgesi
    CustomerInvoice: 'customer-invoice', // Müşteri Faturası
    TransportInvoice: 'transport-invoice', // Taşıma Faturası
    OrderInvoice: 'order-invoice', // Sipariş Faturası
    Custom: 'custom' // Özel
} as const

export default Types;