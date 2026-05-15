import { useState } from 'react'

function App() {

  const [invoice, setInvoice] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const searchOrder = async () => {

    setError('')
    setOrder(null)

    try {

      const response = await fetch(
        `/search?invoice_number=${invoice}`
      )

      const data = await response.text()

      console.log(data)

      if (data.success) {

        setOrder(data.order)

      } else {

        setError(data.message)

      }

    } catch (err) {

      setError('Error connecting to API')

    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>

      <h1>Halcón Customer Search</h1>

      <input
        type="text"
        placeholder="Enter invoice number"
        value={invoice}
        onChange={(e) => setInvoice(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          marginRight: '10px'
        }}
      />

      <button onClick={searchOrder}>
        Search
      </button>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {order && (
        <div style={{
          marginTop: '20px',
          border: '1px solid #ccc',
          padding: '20px',
          width: '400px'
        }}>

          <h2>Order Found</h2>

          <p>
            <strong>Invoice:</strong> {order.invoice_number}
          </p>

          <p>
            <strong>Customer:</strong> {order.customer}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Date:</strong> {order.order_date}
          </p>

          <p>
            <strong>Description:</strong> {order.description}
          </p>
          
          {order.route_photo && (
            <div style={{ marginTop: '20px' }}>

              <p>
                <strong>Route Photo:</strong>
              </p>

              <img
                src={`http://127.0.0.1:8000/storage/${order.route_photo}`}
                alt="Route Evidence"
                width="300"
              />

            </div>
          )}

          {order.delivery_photo && (
            <div style={{ marginTop: '20px' }}>

              <p>
                <strong>Delivery Photo:</strong>
              </p>

              <img
                src={`http://127.0.0.1:8000/storage/${order.delivery_photo}`}
                alt="Delivery Evidence"
                width="300"
              />

            </div>
          )}
          
        </div>
      )}

    </div>
  )
}

export default App
