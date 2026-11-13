/**
 * The design preview: one focused place to look at a design and order it.
 *
 * Opens over the gallery as a native modal <dialog> (focus trap and Escape for
 * free). The phone shows the live template, which the visitor can scroll and
 * tap; the order button always names this exact design.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock3, ExternalLink, MessageCircle, X } from 'lucide-react';
import { occasionLabel, templateUrl, thumbUrl, type InvitationType, type Template } from '../data/catalog';
import { getOrderUrl, trackOrderStart } from '../lib/order';
import { trackEvent } from '../lib/telemetry';
import './design-preview.css';

/** Templates are designed for a phone this size; the frame scales it to fit. */
const PHONE = { width: 390, height: 844 };

type Props = {
  template: Template | null;
  type?: InvitationType;
  /** 1-based position within the designs being browsed. */
  position: number;
  total: number;
  onClose: () => void;
  onStep: (direction: -1 | 1) => void;
};

export default function DesignPreview({ template, type, position, total, onClose, onStep }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 0, height: PHONE.height });
  const [loadedId, setLoadedId] = useState<string>();

  // Open / close the native dialog with the selection, and hold the page still behind it.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (template && !dialog.open) dialog.showModal();
    if (!template && dialog.open) dialog.close();
    document.documentElement.classList.toggle('preview-open', Boolean(template));
    return () => document.documentElement.classList.remove('preview-open');
  }, [template]);

  // Scale the 390px-wide template to whatever size the phone frame ends up.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen || !template) return;
    const observer = new ResizeObserver(([entry]) => {
      const scale = entry.contentRect.width / PHONE.width;
      // Fill the frame exactly, even where its proportions differ slightly from the phone's.
      setFit({ scale, height: scale > 0 ? entry.contentRect.height / scale : PHONE.height });
    });
    observer.observe(screen);
    return () => observer.disconnect();
  }, [template]);

  const selection = template ? { template: template.title, category: template.category } : undefined;
  const occasion = template ? occasionLabel(template) : undefined;
  const loaded = template ? loadedId === template.id : false;

  return (
    <dialog
      ref={dialogRef}
      className="preview"
      aria-labelledby="preview-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        // Arrow keys inside the video player seek the video instead.
        if (event.target instanceof HTMLVideoElement) return;
        if (event.key === 'ArrowLeft') onStep(-1);
        if (event.key === 'ArrowRight') onStep(1);
      }}
    >
      {template && selection && (
        <div className="preview__panel">
          <button type="button" className="preview__close" onClick={onClose} aria-label="Close preview">
            <X size={20} aria-hidden="true" />
          </button>

          {/* Phone */}
          <div className="preview__stage">
            <div className="preview__phone">
              <div ref={screenRef} className="preview__screen" style={{ backgroundImage: `url(${thumbUrl(template)})` }}>
                {template.isVideo ? (
                  <video
                    key={template.id}
                    className="preview__video"
                    src={templateUrl(template)}
                    poster={thumbUrl(template)}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : fit.scale > 0 && (
                  <div className="preview__viewport" style={{ width: PHONE.width, height: fit.height, transform: `scale(${fit.scale})` }}>
                    <iframe
                      key={template.id}
                      src={templateUrl(template)}
                      title={`${template.title} — live preview`}
                      className={loaded ? 'is-loaded' : undefined}
                      onLoad={() => setLoadedId(template.id)}
                    />
                  </div>
                )}
                {!template.isVideo && !loaded && (
                  <div className="preview__loading" role="status"><span aria-hidden="true" />Loading live preview…</div>
                )}
              </div>
            </div>
            <p className="preview__hint">
              {template.isVideo ? 'Press play to watch the video invitation.' : 'Live preview — scroll and tap inside the phone.'}
            </p>
          </div>

          {/* Details + order */}
          <div className="preview__info">
            <div className="preview__text">
              <p className="preview__tag">
                {type?.name}{occasion && type?.id === 'standard' ? ` · ${occasion}` : ''}
              </p>
              <h2 id="preview-title" className="preview__title">{template.title}</h2>
              <p className="preview__description">{template.description}</p>

              {type && (
                <>
                  <p className="preview__price">
                    {type.regularPrice && <s>{type.regularPrice}</s>}
                    <strong>{type.price}</strong>
                    {type.priceNote && <span>{type.priceNote}</span>}
                  </p>
                  <ul className="preview__features">
                    {type.features.map((feature) => (
                      <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>
                    ))}
                    <li><Clock3 size={16} aria-hidden="true" />Delivered within 72 hours</li>
                  </ul>
                </>
              )}
            </div>

            <div className="preview__actions">
              <a
                className="preview__order"
                href={getOrderUrl(selection)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOrderStart(selection, 'showcase_preview')}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Order this design on WhatsApp
              </a>
              <p className="preview__note">
                WhatsApp opens with “{template.title}” already written in your message.
              </p>
              <div className="preview__footer">
                {total > 1 && (
                  <div className="preview__steps">
                    <button type="button" onClick={() => onStep(-1)} aria-label="Previous design"><ChevronLeft size={18} aria-hidden="true" /></button>
                    <span>{position} of {total}</span>
                    <button type="button" onClick={() => onStep(1)} aria-label="Next design"><ChevronRight size={18} aria-hidden="true" /></button>
                  </div>
                )}
                <a
                  className="preview__full"
                  href={templateUrl(template)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('template_opened', { template: template.id, category: template.category, location: 'showcase_preview' })}
                >
                  Open full screen <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
