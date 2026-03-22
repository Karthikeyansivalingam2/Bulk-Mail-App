import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Calendar, CheckCircle, XCircle } from 'lucide-react';

const EmailHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Relative URL for Vercel unified deployment
    axios.get('/api/history').then((res) => {
      setData(res.data);
    }).catch(err => {
      console.log("Error loading history", err);
    });
  }, []);

  return (
    <div className="card">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <History size={24} color="#3b82f6" /> 
        Email History
      </h2>
      
      {data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          <History size={48} opacity={0.2} style={{ marginBottom: '10px' }} />
          <p>No history found. You haven't sent any emails yet.</p>
        </div>
      ) : (
        <div>
          {data.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-item-header">
                <h4 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{item.subject}</h4>
                <span className={item.status === 'success' ? 'badge badge-success' : 'badge badge-danger'} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {item.status === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />} {item.status}
                </span>
              </div>
              <p style={{ margin: '8px 0', color: '#475569', fontSize: '14px' }}>
                <strong>Recipients:</strong> {item.recipients.join(', ')}
              </p>
              {item.status === 'failure' && item.errorDetail && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '8px' }}>
                  <strong>Error:</strong> {item.errorDetail}
                </p>
              )}
              <pre>{item.body}</pre>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
                <Calendar size={14} /> Sent on {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
