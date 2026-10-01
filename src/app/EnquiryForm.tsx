"use client";

import { useRef, useState } from "react";

export default function EnquiryForm({ email }: { email: string }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const briefRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSend() {
    const name = nameRef.current?.value.trim() ?? "";
    const company = companyRef.current?.value.trim() ?? "";
    const fromEmail = emailRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const brief = briefRef.current?.value.trim() ?? "";

    if (!name || !fromEmail || !brief) {
      setError("Please fill in at least your name, email, and a brief before sending.");
      return;
    }
    setError(null);

    const subject = `Enquiry from ${name}${company ? ` (${company})` : ""}`;
    const bodyLines = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${fromEmail}`,
      phone ? `Phone: ${phone}` : null,
      "",
      "What they need printed:",
      brief,
    ].filter((line): line is string => line !== null);

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
    window.location.href = mailto;
  }

  return (
    <div className="form-card">
      <div className="field-row">
        <div className="field">
          <span className="f-label">Name</span>
          <input ref={nameRef} type="text" id="cf-name" placeholder="Your name" />
        </div>
        <div className="field">
          <span className="f-label">Company</span>
          <input ref={companyRef} type="text" id="cf-company" placeholder="Company" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <span className="f-label">Email</span>
          <input ref={emailRef} type="email" id="cf-email" placeholder="you@company.com" />
        </div>
        <div className="field">
          <span className="f-label">Phone</span>
          <input ref={phoneRef} type="tel" id="cf-phone" placeholder="083 000 0000" />
        </div>
      </div>
      <div className="field">
        <span className="f-label">What do you need printed?</span>
        <textarea ref={briefRef} id="cf-brief" placeholder="Tell us about the project, timeline and quantities…"></textarea>
      </div>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "0.84rem", marginTop: "-8px", marginBottom: "12px" }}>{error}</p>
      )}
      <button type="button" className="btn-primary" onClick={handleSend} style={{ cursor: "pointer", border: "none" }}>
        Send enquiry
      </button>
    </div>
  );
}
