export default async function handler(req, res) {

  const invoice = req.query.invoice_number;

  const response = await fetch(
    `https://laravel-evidencia3.infinityfree.me/api/orders/search?invoice_number=${invoice}`
  );

  const data = await response.json();

  res.status(200).json(data);
}