import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../api/mutations';

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)'
};

const formGroupStyle = {
  marginBottom: '20px'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '150px'
};

const submitContainerStyle = {
  textAlign: 'right'
};

const buttonStyle = {
  backgroundColor: '#f0cc00',
  color: '#333',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '4px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.2s, transform 0.1s'
};

const adminButtonStyle = {
  backgroundColor: 'white',
  color: '#333',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '4px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.2s, transform 0.1s'
};
const buttonContainerStyle = {
  textAlign: 'right',
  padding: '10px'
};

const HelpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    issue: ''
  });

  const [createNote, {error}] = useMutation(CREATE_NOTE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await createNote({
      variables:{
        customerName: formData.name,
        customerContact: formData.contactInfo,
        text: formData.issue
      }
    })
      
    } catch (error) {
      console.log(error)
    }
    alert(`Thank you ${formData.name}! Your request has been submitted. We'll contact you shortly.`);
    setFormData({ name: '', contactInfo: '', issue: '' });
  };

  return (
    <div>
    <div style={buttonContainerStyle}>
      <a href="/login">
          <button style={adminButtonStyle}>Login</button>
       </a>
    </div>
    <form id="helpForm" style={formStyle} onSubmit={handleSubmit}>
      <div style={formGroupStyle} className="form-group">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
          style={inputStyle}
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle} className="form-group">
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          placeholder="Email or Phone"
          required
          style={inputStyle}
          value={formData.contactInfo}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle} className="form-group">
        <textarea
          id="issue"
          name="issue"
          placeholder="Request Help - Issues"
          rows={10}
          required
          style={textareaStyle}
          value={formData.issue}
          onChange={handleChange}
        />
      </div>
      <div style={submitContainerStyle} className="form-group submit-container">
        <button type="submit" id="submitBtn" style={buttonStyle}>
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default HelpForm;