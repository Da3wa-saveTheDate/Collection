/**
 * "Make it yours" chapter: visitors type their names and date and pick a
 * design; the 3D phone redraws live (via personalisation.ts) and the order
 * links carry the details into the WhatsApp message.
 */
import { useId, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { getOrderUrl, trackOrderStart } from '../../lib/order';
import { trackEvent } from '../../lib/telemetry';
import { DESIGNS, designFor, orderDetails, updatePersonalisation, usePersonalisation } from './personalisation';

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function PersonaliseChapter() {
  const value = usePersonalisation();
  const design = designFor(value);
  const ids = useId();
  const namesTracked = useRef(false);

  // Report *that* someone personalised, once — never what they typed.
  const onNames = (patch: { first?: string; second?: string }) => {
    updatePersonalisation(patch);
    if (!namesTracked.current) { namesTracked.current = true; trackEvent('experience_interaction', { action: 'names_entered' }); }
  };

  const selection = { template: design.title, category: 'premium-wedding', package: 'premium' as const };

  return (
    <div className="xp__chapter xp__chapter--right" data-xp-section="personalise">
      <div className="xp__copy">
        <p className="xp__label">05 — Make it yours</p>
        <h2 className="xp__heading">See your names on it.</h2>
        <div className="xp__gap" data-xp-focus aria-hidden="true" />
        <p className="xp__body xp__body--intro">
          Type your names and date — the invitation updates as you write, countdown included.
        </p>

        <form className="xp__form" onSubmit={event => event.preventDefault()}>
          <div className="xp__fields">
            <label className="xp__field">
              <span className="xp__label">First name</span>
              <input
                type="text" name="first" autoComplete="off" placeholder="Laila" maxLength={18}
                value={value.first} onChange={event => onNames({ first: event.target.value })}
              />
            </label>
            <label className="xp__field">
              <span className="xp__label">Second name</span>
              <input
                type="text" name="second" autoComplete="off" placeholder="Omar" maxLength={18}
                value={value.second} onChange={event => onNames({ second: event.target.value })}
              />
            </label>
            <label className="xp__field xp__field--wide">
              <span className="xp__label">Event date</span>
              <input
                type="date" name="date" min={todayIso()}
                value={value.date} onChange={event => updatePersonalisation({ date: event.target.value })}
              />
            </label>
          </div>

          <fieldset className="xp__designs">
            <legend className="xp__label">Design · <span className="xp__design-name">{design.title}</span></legend>
            <div className="xp__swatches">
              {DESIGNS.map(option => (
                <label key={option.id} className="xp__swatch" title={option.title}>
                  <input
                    type="radio" name={`${ids}-design`} value={option.id}
                    checked={option.id === value.designId}
                    onChange={() => {
                      updatePersonalisation({ designId: option.id, designChosen: true });
                      trackEvent('experience_interaction', { action: 'design_selected', template: option.title });
                    }}
                  />
                  <img src={`${import.meta.env.BASE_URL}${option.photo}`} alt="" width="56" height="64" loading="lazy" decoding="async" />
                  <span className="xp__sr">{option.title}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <a
            className="xp__reserve xp__reserve--solid"
            href={getOrderUrl({ ...selection, details: orderDetails(value) })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOrderStart(selection, 'experience_personalise')}
          >
            <MessageCircle size={16} aria-hidden="true" /> Order {design.title} on WhatsApp
          </a>
          <p className="xp__privacy">Nothing is saved — your details only fill in your own WhatsApp message.</p>
        </form>
      </div>
    </div>
  );
}
