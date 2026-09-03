// NEEMA HOMES' terms for this website. Everything here is grounded in what
// the site actually does — the estimator's range, the FAQ's starting prices,
// the enquiry form's consent checkbox, the studio's own project photographs.
// Nothing states a timeline, a warranty or a payment term: those belong in
// the quotation, and the studio has not published them.
//
// UPDATED is shown to visitors. Change it whenever the copy below changes.
const UPDATED = "3 September 2026";

const SECTIONS = [
  {
    title: "Who we are",
    paragraphs: [
      "NEEMA HOMES is an interior design studio based in Chennai, Tamil Nadu (“NEEMA HOMES”, “we”, “our”, “us”). We design and deliver home interiors — interior design, space planning and furniture design — across kitchens, bedrooms, dining rooms, living rooms, kids’ rooms and decorative units.",
      "These terms cover your use of this website. By browsing the site or sending us an enquiry through it, you accept them. If you do not, please stop using the site."
    ]
  },
  {
    title: "What this website is",
    paragraphs: [
      "This site shows our work, sets out what we do, gives you a way to estimate a budget, and lets you send us an enquiry. That is all it does.",
      "You cannot book a project, sign an agreement or pay us through this website. Nothing here is an offer capable of acceptance, and nothing you do on this site creates a contract between us. A project starts only when we have issued you a written quotation and you have accepted it in writing."
    ]
  },
  {
    title: "Licence to use the site",
    paragraphs: [
      "You may view this site and its content for your own personal, non-commercial use. You may not republish, resell or redistribute it, and you may not interfere with how it runs."
    ]
  },
  {
    title: "Eligibility",
    paragraphs: [
      "You must be 18 or over to send us an enquiry through this site. If you are under 18, please involve a parent or guardian."
    ]
  },
  {
    title: "Responsible use",
    intro: "When you use this site, you agree not to:",
    list: [
      "use it for any unlawful purpose, or in breach of any law that applies to you",
      "access it by automated means, or by any route other than the one we provide",
      "disrupt, overload or attempt to disrupt the site, its servers or its networks",
      "copy, reproduce, resell or redistribute the site, its content or our photographs",
      "attempt to reverse engineer, decompile or otherwise derive the code behind it",
      "remove or obscure any copyright, trademark or other proprietary notice",
      "send us an enquiry using someone else’s name, number or email address",
      "submit anything unlawful, defamatory, obscene, threatening or infringing"
    ]
  },
  {
    title: "Enquiries, and how we contact you",
    paragraphs: [
      "The enquiry forms on this site ask for your name, and a phone number or an email address, so that we can reply. You may also tell us your location and describe what you have in mind. Please give us details that are accurate and your own.",
      "Before an enquiry can be sent, you tick a box authorising us to contact you about it by WhatsApp, phone call, SMS and email. We use those details to respond to your enquiry and to discuss a possible project — not to sell them on.",
      "You can withdraw that permission at any time by writing to us at the address at the end of this page, and we will stop contacting you."
    ]
  },
  {
    title: "The cost estimator",
    paragraphs: [
      "The estimator on this site takes an area in square feet and a finish level, applies an indicative rate per square foot, and shows you a range. It is a planning tool, and the range it produces is an indication only.",
      "It is not a quotation, not an offer, and not a price we are bound by. It cannot see your site, your layout, your service requirements or the materials you will choose, and the real cost of a project depends on all of those. Please treat the figure as a starting point for a conversation, not as a price."
    ]
  },
  {
    title: "Prices shown on this site",
    paragraphs: [
      "Any starting prices published on this site — including those in our FAQs — are indicative starting points for the configuration described alongside them, and they cover modular interiors for new homes only. They exclude anything not stated there.",
      "Prices and rates on this site may change without notice. The price that applies to your project is the one in the quotation we issue you, and no other."
    ]
  },
  {
    title: "Photographs of our work",
    paragraphs: [
      "The interiors shown in our portfolio and gallery are projects NEEMA HOMES has completed. They are there to show you how we work and what we build.",
      "Every home is different. Dimensions, materials, finishes and site conditions vary from one project to the next, so a photograph on this site is an illustration of our work, not a promise that the same result can be reproduced in your home or at any particular cost."
    ]
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The NEEMA HOMES name and logo, the design and layout of this site, its text, and the photographs of our completed projects belong to us and are protected by copyright and trademark law. Viewing the site gives you no rights over any of it.",
      "You may not copy, publish or reuse any of it — our project photographs included — without our written permission. If you believe something on this site infringes your own rights, write to us with the details and we will look into it."
    ]
  },
  {
    title: "Links, social profiles and apps",
    paragraphs: [
      "This site links to places we do not control, such as our social profiles, WhatsApp, map listings and app stores. We are not responsible for their content or their privacy practices, and a link is not an endorsement.",
      "Some of these listings are not live yet. Where that is the case the site shows the tile or badge without a link, rather than sending you somewhere that does not exist."
    ]
  },
  {
    title: "Availability and accuracy",
    paragraphs: [
      "We keep this site as accurate and current as we can, but we provide it “as is”. We do not warrant that it will be uninterrupted or error-free, that every detail on it is complete and up to date at the moment you read it, or that an enquiry will always send first time. If a form fails, please call or email us instead.",
      "We may change, suspend or withdraw any part of this site at any time, including for maintenance."
    ]
  },
  {
    title: "Liability",
    paragraphs: [
      "To the extent permitted by law, NEEMA HOMES is not liable for any indirect, incidental, special or consequential loss arising out of your use of this website or your inability to use it — including any decision you take on the strength of an estimate or a price shown here.",
      "This clause is about the website. It does not limit our obligations to you under a signed quotation or project agreement, and it does not exclude any liability that cannot be excluded by law.",
      "You agree to cover any loss or claim we incur because you used this site in breach of these terms or in breach of the law."
    ]
  },
  {
    title: "Feedback",
    paragraphs: [
      "We welcome feedback on the site and on our work. Unless you tell us otherwise when you send it, we may act on it freely and without obligation. Please do not send us anything confidential through this site."
    ]
  },
  {
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. The courts at Chennai, Tamil Nadu have exclusive jurisdiction over any dispute arising from them."
    ]
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms as the site changes. The version published on this page is the one that applies, and the date it was last changed is shown at the top."
    ]
  }
];

export default function TermsPage({ email, phone }) {
  return (
    <main className="product-page">
      <section className="product-intro">
        <div className="shell">
          <p className="eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p className="product-intro-text">
            These terms cover your use of this website. The work itself is
            governed by the quotation we issue and you accept — not by this
            page.
          </p>
          <p className="terms-updated">Last updated {UPDATED}</p>
        </div>
      </section>

      <section className="terms-body">
        <div className="shell">
          {SECTIONS.map((section, index) => (
            <article className="terms-section" key={section.title}>
              <h2>
                <span className="terms-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>

              {section.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}

              {section.intro && <p>{section.intro}</p>}

              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <article className="terms-section">
            <h2>
              <span className="terms-number">
                {String(SECTIONS.length + 1).padStart(2, "0")}
              </span>
              Contact
            </h2>
            <p>
              Questions about these terms, or want to withdraw your permission
              for us to contact you? Write to{" "}
              <a href={`mailto:${email}`}>{email}</a>
              {phone ? (
                <>
                  {" "}
                  or call{" "}
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </>
              ) : null}
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
