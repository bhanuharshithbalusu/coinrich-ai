import { useState } from 'react';
import {
  ChevronDown, ChevronUp, User, FileCheck, MapPin, Camera, ClipboardCheck,
  Shield, CheckCircle2, Lock,
} from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';
import FileUploadCard from '../components/FileUploadCard';
import VerificationStatusList from '../components/VerificationStatusList';
import VerticalTimeline from '../components/VerticalTimeline';
import { kyc } from '../data/kyc';

const CARD = {
  backgroundColor: '#131815',
  border: '1px solid #1F2722',
  borderRadius: 12,
};

function SectionHeader({ icon: Icon, title, status, expanded, onToggle }) {
  const statusCfg = {
    completed: { label: 'Completed', color: '#A8E000', bg: 'rgba(168,224,0,0.1)' },
    in_progress: { label: 'In Progress', color: '#F5A623', bg: 'rgba(245,166,35,0.1)' },
    pending: { label: 'Pending', color: '#6B7670', bg: 'rgba(107,118,112,0.1)' },
  }[status] || { label: 'Pending', color: '#6B7670', bg: 'rgba(107,118,112,0.1)' };

  return (
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderBottom: expanded ? '1px solid #1F2722' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: status === 'completed' ? 'rgba(168,224,0,0.12)' : status === 'in_progress' ? 'rgba(245,166,35,0.12)' : '#1A211C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={18} color={statusCfg.color} />
        </div>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: statusCfg.color,
            backgroundColor: statusCfg.bg,
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          {statusCfg.label}
        </span>
        {expanded ? (
          <ChevronUp size={16} color="#6B7670" />
        ) : (
          <ChevronDown size={16} color="#6B7670" />
        )}
      </div>
    </button>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: '0.72rem', color: '#6B7670', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function KYC() {
  const [expanded, setExpanded] = useState({ 1: false, 2: false, 3: true, 4: false, 5: false });

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const sections = [
    { id: 1, title: 'Personal Information', icon: User, status: 'completed' },
    { id: 2, title: 'Identity Document', icon: FileCheck, status: 'completed' },
    { id: 3, title: 'Address Verification', icon: MapPin, status: 'in_progress' },
    { id: 4, title: 'Selfie Verification', icon: Camera, status: 'pending' },
    { id: 5, title: 'Review & Approval', icon: ClipboardCheck, status: 'pending' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Progress tracker card */}
      <div style={{ ...CARD, padding: '20px 28px' }}>
        <ProgressTracker steps={kyc.progressSteps} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        {/* Left: expandable sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((sec) => (
            <div key={sec.id} style={CARD}>
              <SectionHeader
                icon={sec.icon}
                title={sec.title}
                status={sec.status}
                expanded={expanded[sec.id]}
                onToggle={() => toggle(sec.id)}
              />

              {expanded[sec.id] && (
                <div style={{ padding: '20px' }}>
                  {/* Personal Information */}
                  {sec.id === 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <InfoRow label="Full Name" value={kyc.personalInfo.fullName} />
                      <InfoRow label="Date of Birth" value="April 15, 1990" />
                      <InfoRow label="Nationality" value={kyc.personalInfo.nationality} />
                      <InfoRow label="Email Address" value={kyc.personalInfo.email} />
                      <InfoRow label="Phone Number" value={kyc.personalInfo.phone} />
                    </div>
                  )}

                  {/* Identity Document */}
                  {sec.id === 2 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <InfoRow label="Document Type" value={kyc.identityDocument.type} />
                      <InfoRow label="Document Number" value={kyc.identityDocument.number} />
                      <InfoRow label="Expiry Date" value="May 12, 2032" />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={16} color="#A8E000" />
                        <span style={{ fontSize: '0.82rem', color: '#A8E000', fontWeight: 600 }}>
                          Document verified
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Address Verification */}
                  {sec.id === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <p style={{ fontSize: '0.82rem', color: '#8B9890', margin: 0 }}>
                        Please upload one of the following documents showing your current residential address (dated within the last 3 months):
                      </p>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {kyc.addressUploadOptions.map((opt) => (
                          <FileUploadCard
                            key={opt.id}
                            icon={opt.icon}
                            title={opt.title}
                            description={opt.description}
                            status={opt.status}
                            onUpload={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selfie Verification */}
                  {sec.id === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '12px 0' }}>
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: '#1A211C',
                          border: '2px dashed #2A332D',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Camera size={32} color="#6B7670" />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, margin: '0 0 6px' }}>
                          Take a Selfie
                        </p>
                        <p style={{ fontSize: '0.78rem', color: '#8B9890', margin: 0 }}>
                          Please complete Address Verification first before taking your selfie.
                        </p>
                      </div>
                      <button
                        disabled
                        style={{
                          padding: '9px 20px',
                          backgroundColor: '#1A211C',
                          border: '1px solid #2A332D',
                          borderRadius: 8,
                          color: '#6B7670',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'not-allowed',
                        }}
                      >
                        Complete Previous Steps First
                      </button>
                    </div>
                  )}

                  {/* Review & Approval */}
                  {sec.id === 5 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '12px 0' }}>
                      <ClipboardCheck size={40} color="#6B7670" />
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, margin: '0 0 6px' }}>
                          Awaiting Review
                        </p>
                        <p style={{ fontSize: '0.78rem', color: '#8B9890', margin: 0, maxWidth: 340 }}>
                          Once all steps are completed, our team will review your submission. This typically takes 1–2 business days.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Verification Status */}
          <div style={CARD}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2722' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>Verification Status</span>
            </div>
            <div style={{ padding: '12px 20px' }}>
              <VerificationStatusList steps={kyc.verificationStatus} />
            </div>
          </div>

          {/* Verification Timeline */}
          <div style={CARD}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2722' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>Verification Timeline</span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <VerticalTimeline items={kyc.timeline} />
            </div>
          </div>

          {/* Benefits */}
          <div style={CARD}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2722' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>Benefits of Verification</span>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {kyc.benefits.map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={15} color="#A8E000" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: '0.8rem', color: '#8B9890', lineHeight: 1.4 }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Compliance */}
          <div
            style={{
              ...CARD,
              backgroundColor: 'rgba(168,224,0,0.05)',
              border: '1px solid rgba(168,224,0,0.2)',
              padding: '16px 20px',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: 'rgba(168,224,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={18} color="#A8E000" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>Security & Compliance</span>
                <Lock size={13} color="#A8E000" />
              </div>
              <p style={{ fontSize: '0.75rem', color: '#8B9890', margin: 0, lineHeight: 1.5 }}>
                Your personal data is encrypted with AES-256 and processed in compliance with GDPR and global AML/KYC regulations. We never share your data with third parties without consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
