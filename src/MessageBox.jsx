import { useLayoutEffect, useRef } from "react";

// The message field as a small composer: the textarea grows with the text up
// to a ceiling, and files can be attached inline as chips.

const MIN_HEIGHT = 96;
const MAX_HEIGHT = 220;

export default function MessageBox({
  id,
  value,
  onChange,
  attachments,
  onAttach,
  onRemove,
  placeholder
}) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  // Grow to fit the content, then scroll rather than pushing the form down
  useLayoutEffect(() => {
    const field = inputRef.current;
    if (!field) return;

    field.style.height = "0px";
    const content = field.scrollHeight;
    field.style.height = `${Math.min(Math.max(content, MIN_HEIGHT), MAX_HEIGHT)}px`;
    field.style.overflowY = content > MAX_HEIGHT ? "auto" : "hidden";
  }, [value]);

  return (
    <div className="message-box">
      <textarea
        id={id}
        ref={inputRef}
        rows={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />

      {attachments.length > 0 && (
        <ul className="message-files">
          {attachments.map((file, index) => (
            <li className="message-file" key={`${file.name}-${index}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>

              <span className="message-file-name">{file.name}</span>

              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="message-tools">
        <button
          type="button"
          className="message-attach"
          onClick={() => fileRef.current?.click()}
        >
          <span aria-hidden="true">+</span> Attach plans or photos
        </button>

        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          hidden
          onChange={(event) => {
            onAttach(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
