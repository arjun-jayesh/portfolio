import { useState, useEffect, useRef } from 'preact/hooks';

interface ModalDetail {
  goal?: string;
  stack?: string;
}

export default function DirectEngineerModal({ whatsappNumber = '919074811984' }: { whatsappNumber?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [goal, setGoal] = useState('');
  const [stack, setStack] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<ModalDetail>) => {
      lastActiveElementRef.current = document.activeElement as HTMLElement;
      if (e.detail?.goal) setGoal(e.detail.goal);
      if (e.detail?.stack) setStack(e.detail.stack);
      setSubmitted(false);
      setErrorMessage('');
      setIsOpen(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-open-modal="engineer"]');
      if (target) {
        e.preventDefault();
        const initialGoal = target.getAttribute('data-goal') || '';
        const initialStack = target.getAttribute('data-stack') || '';
        handleOpen(new CustomEvent('open-engineer-modal', { detail: { goal: initialGoal, stack: initialStack } }));
      }
    };

    window.addEventListener('open-engineer-modal' as any, handleOpen as EventListener);
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('open-engineer-modal' as any, handleOpen as EventListener);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    lastActiveElementRef.current?.focus();
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim() || !contact.trim()) {
      setErrorMessage('Please provide your name and contact details.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'Direct-to-Engineer Brief',
          name,
          contact,
          goal: goal || (stack ? `Engineering enquiry for ${stack}` : 'General Inquiry'),
          stack,
          source: 'DirectEngineerModal'
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const encodedWhatsAppText = encodeURIComponent(
    `Hello kinbo Engineer, my name is ${name || 'Founder'}. I need help with: ${goal || stack || 'Software Architecture & Development'}. Direct contact: ${contact}.`
  );
  const waUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedWhatsAppText}`;

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="engineer-modal-title"
    >
      <div
        ref={modalRef}
        class="w-full max-w-lg bg-[#111111] border border-[rgba(244,243,239,0.16)] rounded-[8px] p-6 sm:p-8 text-[#F4F3EF] shadow-2xl relative"
      >
        <button
          type="button"
          onClick={closeModal}
          class="absolute top-5 right-5 text-[rgba(244,243,239,0.6)] hover:text-[#FFFFFF] touch-target text-xl font-mono"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div class="mb-6">
          <div class="font-mono text-[12px] uppercase tracking-wider text-[#FF5A52] mb-1">
            01 / DIRECT ACCESS
          </div>
          <h2 id="engineer-modal-title" class="text-xl sm:text-2xl font-semibold tracking-tight text-[#FFFFFF]">
            Talk Directly to the Engineer
          </h2>
          <p class="text-sm text-[rgba(244,243,239,0.78)] mt-2">
            We don't have a sales team. You talk directly to the engineer from day one.
          </p>
          {stack && (
            <div class="mt-3 inline-block px-2.5 py-1 bg-[#181818] border border-[rgba(244,243,239,0.14)] rounded-[4px] font-mono text-[12px] text-[#F4F3EF]">
              Selected Stack: {stack}
            </div>
          )}
        </div>

        {submitted ? (
          <div class="py-6 space-y-5">
            <div class="p-4 bg-[#181818] border-l-4 border-[#D9261C] rounded-[4px]">
              <div class="font-mono text-[12px] text-[#FF5A52] uppercase mb-1">Inquiry Dispatched</div>
              <p class="text-sm text-[#F4F3EF]">
                Your brief has been routed straight to our engineering desk. An engineer will review it and reply within 4 business hours.
              </p>
            </div>
            <div class="space-y-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-full touch-target bg-[#D9261C] hover:bg-[#B81D14] text-white font-medium text-sm rounded-[4px] px-5 py-3 transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                <span>Connect on WhatsApp Now</span>
                <span class="font-mono">→</span>
              </a>
              <button
                type="button"
                onClick={closeModal}
                class="w-full touch-target bg-[#181818] hover:bg-[#222222] text-[rgba(244,243,239,0.85)] border border-[rgba(244,243,239,0.16)] font-medium text-sm rounded-[4px] px-5 py-3 transition-colors"
              >
                Close Dialog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="space-y-4">
            {errorMessage && (
              <div class="p-3 bg-[#D9261C]/15 border border-[#D9261C] rounded-[4px] text-xs text-[#FF5A52] font-mono">
                {errorMessage}
              </div>
            )}

            <div>
              <label for="engineer-name" class="block font-mono text-[12px] text-[rgba(244,243,239,0.78)] uppercase mb-1.5">
                1. Your Name *
              </label>
              <input
                ref={nameInputRef}
                id="engineer-name"
                name="name"
                type="text"
                required
                autocomplete="name"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="e.g. Alex Mercer"
                class="w-full bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] placeholder:text-[rgba(244,243,239,0.35)] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>

            <div>
              <label for="engineer-contact" class="block font-mono text-[12px] text-[rgba(244,243,239,0.78)] uppercase mb-1.5">
                2. Phone or Email *
              </label>
              <input
                id="engineer-contact"
                name="contact"
                type="text"
                required
                autocomplete="tel"
                value={contact}
                onInput={(e) => setContact((e.target as HTMLInputElement).value)}
                placeholder="e.g. +91 9876543210 or founder@domain.com"
                class="w-full bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] placeholder:text-[rgba(244,243,239,0.35)] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>

            <div>
              <label for="engineer-goal" class="block font-mono text-[12px] text-[rgba(244,243,239,0.78)] uppercase mb-1.5">
                3. 1-Line Project Goal
              </label>
              <input
                id="engineer-goal"
                name="goal"
                type="text"
                autocomplete="off"
                value={goal}
                onInput={(e) => setGoal((e.target as HTMLInputElement).value)}
                placeholder="e.g. High-throughput inventory sync with offline mobile app"
                class="w-full bg-[#181818] border border-[rgba(244,243,239,0.16)] rounded-[4px] px-3.5 py-2.5 text-sm text-[#F4F3EF] placeholder:text-[rgba(244,243,239,0.35)] focus:border-[#FF5A52] focus:outline-none"
              />
            </div>

            <div class="pt-2">
              <button
                type="submit"
                disabled={loading}
                class="w-full touch-target bg-[#D9261C] hover:bg-[#B81D14] disabled:opacity-60 text-white font-medium text-sm rounded-[4px] px-5 py-3 transition-colors inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Routing to Engineer...</span>
                ) : (
                  <>
                    <span>Submit Brief to Engineer</span>
                    <span class="font-mono">→</span>
                  </>
                )}
              </button>
            </div>
            <p class="font-mono text-[12px] text-[rgba(244,243,239,0.5)] text-center pt-1">
              Direct engineer reply &lt; 4 business hours · Zero sales outreach
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
