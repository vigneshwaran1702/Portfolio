import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    
    // Simulate contact form submission
    setTimeout(() => {
      // Simulate random success/failure to show both states
      const isSuccess = Math.random() > 0.05; // 95% success rate
      if (isSuccess) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: 'Web Development', message: '' });
      } else {
        setStatus('error');
      }
    }, 1800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-panel"
      style={{
        padding: 'clamp(20px, 5vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: 'rgba(18, 9, 33, 0.25)',
        border: '1px solid var(--border-primary)',
        width: '100%',
      }}
      aria-label="Send a message to Vigneshwaran"
    >
      {/* Success Banner */}
      {status === 'success' && (
        <div
          role="alert"
          style={{
            padding: '16px',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid var(--success)',
            color: 'var(--success)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.95rem',
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          Thank you! Your message was sent successfully. I will get back to you soon.
        </div>
      )}

      {/* Error Banner */}
      {status === 'error' && (
        <div
          role="alert"
          style={{
            padding: '16px',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.95rem',
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          Something went wrong. Please try again or email me directly at vigneshw1702@gmail.com
        </div>
      )}

      {/* Name Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
        <label htmlFor="form-name" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          Name
        </label>
        <input
          type="text"
          id="form-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'loading'}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
          style={{
            padding: '14px',
            backgroundColor: 'var(--background-secondary)',
            border: errors.name ? '1px solid var(--error)' : '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            transition: 'border-color var(--transition-fast)'
          }}
          className="form-input"
        />
        {errors.name && (
          <span id="error-name" style={{ fontSize: '0.8rem', color: 'var(--error)' }}>
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
        <label htmlFor="form-email" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          Email
        </label>
        <input
          type="email"
          id="form-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading'}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
          style={{
            padding: '14px',
            backgroundColor: 'var(--background-secondary)',
            border: errors.email ? '1px solid var(--error)' : '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            transition: 'border-color var(--transition-fast)'
          }}
          className="form-input"
        />
        {errors.email && (
          <span id="error-email" style={{ fontSize: '0.8rem', color: 'var(--error)' }}>
            {errors.email}
          </span>
        )}
      </div>

      {/* Project Type Select */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
        <label htmlFor="form-project-type" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          Project Type
        </label>
        <select
          id="form-project-type"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          disabled={status === 'loading'}
          style={{
            padding: '14px',
            backgroundColor: 'var(--background-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            transition: 'border-color var(--transition-fast)'
          }}
          className="form-input"
        >
          <option value="Web Development">Web Development</option>
          <option value="WordPress Development">WordPress Development</option>
          <option value="React Frontend">React Frontend</option>
          <option value="Digital Platform / Product">Digital Platform / Product</option>
          <option value="SEO Optimization">SEO Optimization</option>
        </select>
      </div>

      {/* Message Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
        <label htmlFor="form-message" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          Message
        </label>
        <textarea
          id="form-message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'error-message' : undefined}
          style={{
            padding: '14px',
            backgroundColor: 'var(--background-secondary)',
            border: errors.message ? '1px solid var(--error)' : '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            lineHeight: 1.5,
            resize: 'vertical',
            transition: 'border-color var(--transition-fast)'
          }}
          className="form-input"
        />
        {errors.message && (
          <span id="error-message" style={{ fontSize: '0.8rem', color: 'var(--error)' }}>
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          color: '#fdf8e2',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'bold',
          fontSize: '1rem',
          letterSpacing: '0.5px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          opacity: status === 'loading' ? 0.7 : 1,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
        }}
        className="form-submit-btn"
      >
        {status === 'loading' ? (
          <>
            <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" stroke="rgba(5,2,9,0.2)"></circle>
              <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor"></path>
            </svg>
            Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <style>{`
        .form-input:focus {
          border-color: var(--accent-secondary) !important;
        }
        .form-submit-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
