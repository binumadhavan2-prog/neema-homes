import { useEffect, useRef, useState } from "react";
import FingerprintSpinner from "./FingerprintSpinner.jsx";
import { submitEnquiry } from "./enquiries.js";

// The enquiry card under the calculator. Same field styling as the contact
// card on the home page, so the two read as one form language.

const BLANK = {
  name: "",
  phone: "",
  email: "",
  location: "",
  brief: ""
};

export default function EnquiryCard() {
  const [values, setValues] = useState(BLANK);
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const set = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  async function onSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    // The spinner runs for at least a beat, so a fast write still registers
    // as a click rather than flashing past.
    const [{ error: submitError }] = await Promise.all([
      submitEnquiry({
        source: "calculator",
        name: values.name,
        phone: values.phone,
        email: values.email,
        location: values.location,
        message: values.brief,
        consented: hasConsented
      }),
      new Promise((resolve) => {
        timer.current = setTimeout(resolve, 550);
      })
    ]);

    setIsSubmitting(false);

    if (submitError) {
      setError(submitError);
      return;
    }

    setValues(BLANK);
    setHasConsented(false);
    alert("Enquiry submitted successfully!");
  }

  return (
    <section className="calc-enquiry" id="calc-enquiry">
      <div className="calc-enquiry-card">
        <div className="calc-enquiry-head">
          <h2>Tell Us About Your Project</h2>
          <p>
            Share a few details and we will come back to you with a proper
            quote for your home.
          </p>
        </div>

        <form className="contact-form calc-enquiry-form" onSubmit={onSubmit}>
          <div className="calc-enquiry-grid">
            <div className="form-group">
              <label htmlFor="enq-name">Name</label>
              <input
                id="enq-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={values.name}
                onChange={set("name")}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="enq-phone">Phone Number</label>
              <input
                id="enq-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                value={values.phone}
                onChange={set("phone")}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="enq-email">Email</label>
              <input
                id="enq-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={set("email")}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="enq-location">Property Location</label>
              <input
                id="enq-location"
                type="text"
                name="location"
                required
                value={values.location}
                onChange={set("location")}
                placeholder="Where is the property?"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="enq-brief">
              Let us know about your project needs
            </label>
            <textarea
              id="enq-brief"
              name="brief"
              rows={5}
              value={values.brief}
              onChange={set("brief")}
              placeholder="Rooms you want done, the look you are after, timelines — anything that helps."
            />
          </div>

          <label className="form-consent" htmlFor="enq-consent">
            <input
              id="enq-consent"
              type="checkbox"
              checked={hasConsented}
              onChange={(event) => setHasConsented(event.target.checked)}
            />
            <span>
              By proceeding, I authorise NEEMA HOMES to contact me via WhatsApp,
              phone calls, SMS and e-mail about my enquiry.
            </span>
          </label>

          {error ? <p className="calc-form-error">{error}</p> : null}

          <button
            type="submit"
            className={isSubmitting ? "submit-btn is-busy" : "submit-btn"}
            disabled={isSubmitting || !hasConsented}
          >
            <span className="btn-label">Submit</span>
            <FingerprintSpinner />
          </button>
        </form>
      </div>
    </section>
  );
}
