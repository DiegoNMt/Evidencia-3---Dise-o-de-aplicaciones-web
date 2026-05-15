export default async function handler(req, res) {

  try {

    const invoice = req.query.invoice_number;

    const response = await fetch(
      `https://laravel-evidencia3.infinityfree.me/api/orders/search?invoice_number=${invoice}`
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}