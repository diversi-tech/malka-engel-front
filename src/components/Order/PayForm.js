

export const PayForm = ()=>{
return <>
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card">
        <div className="card-body">
      <h2>פרטי אשראי</h2>
      <form>
        
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">מספר כרטיס אשראי</label>
          <input type="text" className="form-control" id="cardNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">תאריך תפוגה</label>
          <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cvv" />
        </div>
        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>    </div>
    </div>

</>
}