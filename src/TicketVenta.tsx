import { useState } from 'react';

import ticket from './App';
export interface Response {
  success: string,
  message: string,
  content: string
}
export default function App() {
  const [base64, setBase64] = useState('');
  const [message, setMessage] = useState('');

  const onGenerateTicket = async (output: string) => {
    setBase64('');
    setMessage('');

    const response: Response = await ticket(output, '');

    if (!response?.success) {
      alert(response?.message);
      return;
    }

    if (output === 'b64') {
      setBase64(response?.content ?? '');
    }

    setMessage(response?.message);

    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <div className="mx-main-container">
      <div className="mx-btn-container">
        <button
          className="mx-btn-primary"
          onClick={() => onGenerateTicket('b64')}
        >
          GENERAR TICKET
        </button>
        <button
          className="mx-btn-secondary"
          onClick={() => onGenerateTicket('print')}
        >
          IMPRIMIR TICKET
        </button>
      </div>
      {message && <p className="mx-alert-info">{message}</p>}
      {base64 && (
        <iframe
          src={`data:application/pdf;base64,${base64}`}
          className="mx-iframe"
        />
      )}
    </div>
  );
}