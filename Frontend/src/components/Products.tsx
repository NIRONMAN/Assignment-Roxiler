
import React, { useState } from 'react';

const initialTransactions = [
  { id: 1, title: 'Product A', description: 'Description of Product A', price: 200, category: 'Electronics', sold: true, image: 'path/to/imageA.jpg' },
  { id: 2, title: 'Product B', description: 'Description of Product B', price: 150, category: 'Apparel', sold: false, image: 'path/to/imageB.jpg' },
  { id: 3, title: 'Product C', description: 'Description of Product C', price: 300, category: 'Home', sold: true, image: 'path/to/imageC.jpg' },
  
];

const Products=() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions] = useState(initialTransactions);

  
  const calculateStatistics = () => {
    const totalSale = transactions.reduce((total, transaction) => total + (transaction.sold ? transaction.price : 0), 0);
    const totalSold = transactions.filter(transaction => transaction.sold).length;
    const totalNotSold = transactions.filter(transaction => !transaction.sold).length;

  };

  
  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transaction-table">
      <h3>Transactions</h3>
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            calculateStatistics(); 
          }}
        />
        <select onChange={() => calculateStatistics()}>
          <option value="March" selected>March</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Products