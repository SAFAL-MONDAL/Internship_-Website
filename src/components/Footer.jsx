"use client"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"
import "../style/Footer.css"

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Instagram size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" },
    { icon: <Mail size={18} />, href: "#" },
  ]

  const footerLinks = [
    { title: "About Us", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="footer"
    >
      <div className="footer-container">
        <div className="footer-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="footer-branding"
          >
            <div className="footer-logo">
              <div className="footer-logo-icon">I</div>
              <span className="footer-logo-text">InternPortal</span>
            </div>
            <p className="footer-description">
              Connecting talented students with industry-leading companies for meaningful internship experiences.
            </p>
            <div className="footer-social">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="social-link"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="footer-links-container"
          >
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <h3 className="footer-links-title">For Students</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Browse Internships
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Career Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Success Stories
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h3 className="footer-links-title">For Companies</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Post Internships
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Talent Search
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Partner Programs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h3 className="footer-links-title">Resources</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Events
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h3 className="footer-links-title">Company</h3>
                <ul className="footer-links">
                  {footerLinks.map((link, i) => (
                    <motion.li
                      key={link.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <a href={link.href} className="footer-link">
                        {link.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="footer-copyright"
        >
          <p>© 2023 InternPortal. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

