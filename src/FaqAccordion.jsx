import { useId, useState } from "react";

// The FAQ list. One answer is open at a time — opening another closes the
// last, so the section keeps its rhythm instead of unrolling into a wall of
// text. The arrow matches the navbar's: down when shut, flipped when open.
//
// An item is { question, answer }, plus an optional `prices` list of
// { label, value } rows and a `note` under them.
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const uid = useId();

  return (
    <ul className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const buttonId = `${uid}-q${index}`;
        const panelId = `${uid}-a${index}`;

        return (
          <li
            key={item.question}
            className={isOpen ? "faq-item is-open" : "faq-item"}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq-arrow" aria-hidden="true">
                  ↓
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-answer"
            >
              {/* The inner box is what the grid collapses; `visibility` keeps
                  a shut answer out of the reading order without costing the
                  transition, which `display: none` would. */}
              <div className="faq-answer-inner">
                <p>{item.answer}</p>

                {item.prices ? (
                  <ul className="faq-prices">
                    {item.prices.map((price) => (
                      <li key={price.label}>
                        <span>{price.label}</span>
                        <strong>{price.value}</strong>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.note ? <p className="faq-note">{item.note}</p> : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
