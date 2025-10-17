import "./Contact.css";

const Contact = () => {
    return (
        <section className="contact-container">
            <div className="contact-card">
                <div className="contact-info-panel">
                    <div className="contact-label">CONTACT</div>
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-section-desc">
                        Have questions about Xployt.ai? We'd love to hear from you. Send us a message and we'll
                        respond as soon as possible.
                    </p>

                    <div className="contact-details">
                        <div>
                            <h3 className="contact-info-title">Email</h3>
                            <p className="contact-info-email">support@xployt.ai</p>
                        </div>
                        <div>
                            <h3 className="contact-info-title">Office Hours</h3>
                            <p className="contact-info-hours">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-panel">
                    <h2 className="contact-section-title">Send us a Message</h2>
                    <form className="contact-form">
                        <div>
                            <label className="contact-label">Name</label>
                            <input type="text" className="contact-input" />
                        </div>
                        <div>
                            <label className="contact-label">Email</label>
                            <input type="email" className="contact-input" />
                        </div>
                        <div>
                            <label className="contact-label">Message</label>
                            <textarea rows={5} className="contact-textarea" />
                        </div>
                        <button type="submit" className="contact-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;