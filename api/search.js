export async function GET(request) {

  try {

    const { searchParams } = new URL(request.url);

    const invoice = searchParams.get('invoice_number');

    const response = await fetch(
      `https://laravel-evidencia3.infinityfree.me/api/orders/search?invoice_number=${invoice}`
    );

    const data = await response.json();

    return Response.json(data);

  } catch (error) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}