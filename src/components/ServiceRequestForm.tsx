import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      formType: 'service-request',
      name,
      email,
      phone,
      company,
      subject,
      message,
    };
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.text();
      alert(result);
    } catch (error) {
      alert('Failed to send service request.');
    }
  };

  return (
    <form onSubmit={handleServiceSubmit} className="space-y-6 max-w-xl mx-auto">
      <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <Input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
      <Input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} required />
      <Input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
      <Textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Submit Request</Button>
    </form>
  );
};

export default ContactPage;
