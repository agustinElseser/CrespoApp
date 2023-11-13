// ** Crea la facturacion para excel
  export const createInvoice = (data) => {
    const invoice:any = [];

    const processItem = (item, indent = '') => {
      const { service, quantity, total, children } = item;

      invoice.push({
        Servicio: `${indent}${service}`,
        Cantidad: quantity,
        Total: total,
      });

      if (children && children.length > 0) {
        children.forEach((child) => {
          processItem(child, `${indent}  ${indent}`);
        });
      }
    };

    data.forEach((item) => {
      processItem(item);
    });

    return invoice;
  };