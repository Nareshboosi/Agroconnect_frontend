import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AgroConnect Invoice", 14, 15);

  doc.setFontSize(11);
  doc.text(`Order ID: ${order.id}`, 14, 25);
  doc.text(`Date: ${order.orderDate}`, 14, 32);
  doc.text(`Status: ${order.status}`, 14, 39);

  const tableData = order.items.map(item => ([
    item.crop.cropName,
    item.quantity + " kg",
    "₹" + item.price
  ]));

  doc.autoTable({
    head: [["Crop", "Quantity", "Price"]],
    body: tableData,
    startY: 45
  });

  doc.text(`Total Amount: ₹${order.totalPrice}`, 14, doc.lastAutoTable.finalY + 10);

  doc.save(`invoice_order_${order.id}.pdf`);
};
