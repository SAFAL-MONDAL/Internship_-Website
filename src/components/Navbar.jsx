import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import "../style/Navbar.css"
import Login from "../pages/Login"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo-container">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="navbar-logo"
              >
                <div className="logo-icon">I</div>
                <span className="logo-text">InternPortal</span>
              </motion.div>
            </div>

            <div className="navbar-links">
              {["Home", "Internships", "Companies", "Resources", "Profile"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="navbar-link"
                >
                  {item}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="signin-button"
                onClick={() => setShowLogin(true)}
              >
                Log In
              </motion.button>
            </div>

            <div className="mobile-menu-button">
              <button onClick={() => setIsOpen(!isOpen)} className="menu-toggle">
                {isOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-links">
              {["Home", "Internships", "Companies", "Resources", "Profile"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="mobile-menu-link"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mobile-signin-button"
                onClick={() => {
                  setShowLogin(true)
                  setIsOpen(false)
                }}
              >
                Log In
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <button 
              className="close-login-modal"
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar