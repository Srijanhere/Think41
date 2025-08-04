// src/pages/Customers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerCard from '../components/CustomerCard';
import api from '../../api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [orderCounts, setOrderCounts] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data.data);
        setFiltered(res.data.data);
        setLoading(false);

        // Fetch order counts for each customer
        const counts = {};
        for (const customer of res.data.data) {
          const detailRes = await axios.get(`/api/customers/${customer.id}`);
          counts[customer.id] = detailRes.data.data.orderCount || 0;
        }
        setOrderCounts(counts);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Search filter
  useEffect(() => {
    const keyword = search.toLowerCase();
    const result = customers.filter(
      (c) =>
        c.first_name.toLowerCase().includes(keyword) ||
        c.last_name.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword)
    );
    setFiltered(result);
  }, [search, customers]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-6 px-4 py-2 border w-full rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading customers...</p>
      ) : filtered.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              orderCount={orderCounts[customer.id] || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
