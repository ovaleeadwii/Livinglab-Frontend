import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import contact from "../../assets/contact.svg";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-[#EAF6EA] py-40" id="Contact">
      <h1 className="text-4xl font-bold text-[#537052] text-center py-10">
        Contacts
      </h1>
      <div className="hero">
        <div
          className="flex flex-col items-center lg:justify-center justify-start gap-20 px-10 md:px-0"
          data-aos="fade-left"
        >
          <img src={contact} alt="contact" className="rounded-xl" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d351.1107323640011!2d105.2427745087701!3d-5.361237641230526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c549e3500c03%3A0xcf75d2f7d0e1028b!2sGedung%20H%20Teknik%20Elektro%20-%20FT!5e0!3m2!1sid!2sid!4v1719211822574!5m2!1sid!2sid"
            width="1200"
            height="600"
            className="rounded-xl hidden md:block"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
