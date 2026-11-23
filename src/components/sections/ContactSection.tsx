import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BUSINESS, SERVICE_OPTIONS } from "../../constants/content";
import Button from "../ui/Button";
import {
  CheckCircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "../icons/Icons";
import { easeOut, springSoft } from "../motion/Reveal";
import "./ContactSection.css";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s()+-]{10,}$/;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!phoneRegex.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!emailRegex.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    return next;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(initial);
    }, 600);
  };

  const errorClass = "mt-1 text-xs text-orange";

  return (
    <section
      id="contact"
      className="atr-contact relative overflow-hidden bg-deep-navy py-14 sm:py-16 lg:py-20"
    >
      <div id="quote" className="absolute top-0 h-0 w-0" aria-hidden />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
        style={{ backgroundImage: "url(/images/contact-bg.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-deep-navy/72" aria-hidden />

      <motion.div
        className="atr-contact-orb left-[-6%] top-[12%] h-56 w-56 bg-orange/30"
        animate={{ y: [0, 24, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="atr-contact-orb bottom-[8%] right-[-4%] h-72 w-72 bg-[#1b4a7a]/50"
        animate={{ y: [0, -18, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.div
          className="flex flex-col justify-center text-cream"
          variants={fadeUp}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-orange uppercase">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get a Free Quote Today
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/75">
            Need HVAC or plumbing service? Get in touch with A.T.R Heating and
            Cooling for dependable solutions for your home or business.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              {
                href: BUSINESS.phoneHref,
                icon: PhoneIcon,
                label: "Phone",
                value: BUSINESS.phone,
              },
              {
                href: BUSINESS.emailHref,
                icon: MailIcon,
                label: "Email",
                value: BUSINESS.email,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: easeOut }}
                >
                  <a href={item.href} className="atr-contact-chip">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/20 text-orange">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs text-cream/50">
                        {item.label}
                      </span>
                      <span className="font-semibold text-cream">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </motion.li>
              );
            })}
            <motion.li
              className="atr-contact-chip"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36, duration: 0.5, ease: easeOut }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/20 text-orange">
                <MapPinIcon size={18} />
              </span>
              <span>
                <span className="block text-xs text-cream/50">Service Area</span>
                <span className="font-semibold text-cream">
                  {BUSINESS.location}
                </span>
              </span>
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          className="atr-contact-glass p-6 sm:p-8"
          variants={fadeUp}
          whileHover={{ y: -4 }}
          transition={springSoft}
        >
          <div className="relative z-[1]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center py-10 text-center"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={springSoft}
                >
                  <motion.span
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange/20 text-orange"
                    initial={{ scale: 0.6, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={springSoft}
                  >
                    <CheckCircleIcon size={32} />
                  </motion.span>
                  <h3 className="text-xl font-bold text-cream">
                    Request Received
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-cream/70">
                    Thank you for contacting A.T.R Heating and Cooling.
                    We&apos;ll get back to you shortly about your quote request.
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                    variant="outline-white"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <h3 className="mb-1 text-xl font-bold text-cream">
                    Request a Quote
                  </h3>
                  <p className="mb-6 text-sm text-cream/60">
                    Tell us what you need — we typically respond the same day.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="atr-glass-label">
                        Full Name <span className="text-orange">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        className="atr-glass-field"
                        placeholder="John Smith"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className={errorClass}>{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="atr-glass-label">
                        Phone Number <span className="text-orange">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="atr-glass-field"
                        placeholder="(513) 555-0000"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className={errorClass}>{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="atr-glass-label">
                        Email Address <span className="text-orange">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        className="atr-glass-field"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className={errorClass}>{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="service" className="atr-glass-label">
                        Service Needed <span className="text-orange">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`atr-glass-field ${!form.service ? "text-cream/40" : ""}`}
                        aria-invalid={!!errors.service}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className={errorClass}>{errors.service}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-5">
                    <div>
                      <label htmlFor="message" className="atr-glass-label">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        className="atr-glass-field atr-glass-textarea"
                        placeholder="Tell us about your project or issue..."
                      />
                    </div>
                    <Button
                      type="submit"
                      showArrow
                      size="md"
                      className="w-full shrink-0 !py-3 !text-[15px]"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Request a Quote"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
