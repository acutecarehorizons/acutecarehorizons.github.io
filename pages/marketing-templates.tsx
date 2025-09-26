import React, { useEffect, useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  file: string;
}

const templates: Template[] = [
  {
    id: 'launch-2025',
    name: '2025 Edition Launch',
    description: 'General launch announcement for all 2025 edition books',
    file: 'launch-2025.html'
  },
  {
    id: 'np-focused-2025',
    name: 'Nurse Practitioner Focused',
    description: 'Targeted campaign specifically for nurse practitioners',
    file: 'np-focused-2025.html'
  },
  {
    id: 'pa-focused-2025',
    name: 'Physician Assistant Focused',
    description: 'Targeted campaign specifically for physician assistants',
    file: 'pa-focused-2025.html'
  },
  {
    id: 'seasonal-promo-2025',
    name: 'Seasonal Promotion',
    description: 'Interactive holiday campaign with countdown timer and quiz',
    file: 'seasonal-promo-2025.html'
  },
  {
    id: 'educational-2025',
    name: 'Educational Content',
    description: 'Interactive case studies and learning-focused content',
    file: 'educational-2025.html'
  },
  {
    id: 'testimonial-2025',
    name: 'Testimonial Focused',
    description: 'Social proof campaign highlighting customer success stories and reviews',
    file: 'testimonial-2025.html'
  },
  {
    id: 'urgency-2025',
    name: 'Urgency/Countdown',
    description: 'Urgency-based campaign creating FOMO about falling behind without current protocols',
    file: 'urgency-2025.html'
  },
  {
    id: 'npace-2025',
    name: 'NPACE Email Blast',
    description: 'NPACE Email Blast',
    file: 'npace-2025.html'
  }
];

export default function MarketingTemplatesViewer() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [templateHtml, setTemplateHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`/email-templates/${selectedTemplate.file}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load template');
        return res.text();
      })
      .then((html) => {
        setTemplateHtml(html);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedTemplate]);

  return (
    <div
      style={{
        maxWidth: '100%',
        width: 'min(1400px, 100vw)',
        margin: '0 auto',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <h1>Marketing Email Templates</h1>
      
      <div
        className="marketing-flex"
        style={{
          display: 'flex',
          gap: 24,
          marginTop: 24,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {/* Template List */}
        <div
          className="marketing-sidebar"
          style={{
            width: 320,
            minWidth: 220,
            flexShrink: 0,
            marginBottom: 24,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Templates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                style={{
                  padding: '12px 16px',
                  border: selectedTemplate.id === template.id ? '2px solid #3387a2' : '1px solid #ddd',
                  borderRadius: '8px',
                  background: selectedTemplate.id === template.id ? '#f0f8ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
                  {template.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Template Preview */}
        <div
          className="marketing-preview"
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Preview: {selectedTemplate.name}</h3>
          {loading && <p>Loading template...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {templateHtml && (
            <div style={{ border: '1px solid #ccc', borderRadius: 8, overflow: 'auto' }}>
              <iframe
                title="Email Template Preview"
                srcDoc={templateHtml}
                style={{ width: '100%', minHeight: 800, border: 'none', background: '#fff' }}
              />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .marketing-flex {
            flex-direction: column !important;
          }
          .marketing-sidebar {
            width: 100% !important;
            min-width: 0 !important;
            margin-bottom: 16px !important;
            order: 0;
          }
          .marketing-preview {
            order: 1;
          }
        }
      `}</style>
    </div>
  );
} 