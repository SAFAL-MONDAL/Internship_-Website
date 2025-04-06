"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronRight, X, FileText, Video, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../style/Dashboard.css"

// Application Form Component
const ApplicationForm = ({ internship, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: ""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(internship)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>Apply for {internship.title}</h2>
          <span className="badge">{internship.category}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Upload Resume (PDF) *</label>
            <div className="file-upload">
              <label>
                <input type="file" accept=".pdf" required />
                <span>Choose File</span>
                {formData.resume?.name || "No file selected"}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Cover Letter</label>
            <textarea 
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// Resources Component
const ResourcesPanel = ({ internship, onClose }) => {
  const resources = [
    { type: "document", title: "Getting Started Guide", url: "#" },
    { type: "video", title: "Setup Tutorial", url: "#" },
    { type: "link", title: "Official Documentation", url: "#" },
    { type: "document", title: "Project Guidelines", url: "#" }
  ]

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content resources-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{internship.title} Resources</h2>
          <p className="description">{internship.description}</p>
        </div>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <a key={index} href={resource.url} className="resource-card">
              <div className="resource-icon">
                {resource.type === "document" && <FileText size={20} />}
                {resource.type === "video" && <Video size={20} />}
                {resource.type === "link" && <LinkIcon size={20} />}
              </div>
              <h3>{resource.title}</h3>
            </a>
          ))}
        </div>

        <button className="close-resources" onClick={onClose}>
          Back to Internships
        </button>
      </motion.div>
    </div>
  )
}

// Internship Card Component
const InternshipCard = ({ 
  title, 
  category, 
  description, 
  delay = 0,
  onApply,
  onViewResources,
  isApplied
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="internship-card"
    >
      <div className="card-header">
        <span className="category-badge">{category}</span>
        <ChevronRight className="arrow-icon" />
      </div>
      
      <h3>{title}</h3>
      <p>{description}</p>
      
      {isApplied ? (
        <button 
          className="resources-btn"
          onClick={() => onViewResources({ title, category, description })}
        >
          View Resources
        </button>
      ) : (
        <button 
          className="apply-btn"
          onClick={() => onApply({ title, category, description })}
        >
          Apply Now
        </button>
      )}
    </motion.div>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [currentInternship, setCurrentInternship] = useState(null)
  const [appliedInternships, setAppliedInternships] = useState([])

  const handleApply = (internship) => {
    setCurrentInternship(internship)
    setActiveModal('apply')
  }

  const handleViewResources = (internship) => {
    setCurrentInternship(internship)
    setActiveModal('resources')
  }

  const handleSubmitApplication = () => {
    setAppliedInternships([...appliedInternships, currentInternship.title])
    setActiveModal('resources')
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  // Sample internship data
  const internships = {
    web: [
      {
        title: "Front-End Development",
        category: "Web Development",
        description: "Build interactive user interfaces with React and modern JavaScript frameworks."
      },
      {
        title: "Back-End Development",
        category: "Web Development",
        description: "Develop robust server-side applications with Node.js and databases."
      },
      {
        title: "Full-stack Development",
        category: "Web Development",
        description: "Develop robust server-side applications with Node.js and databases."
      }
    ],
    mobile: [
      {
        title: "Android Development",
        category: "Mobile Development",
        description: "Create Android apps using Kotlin and Jetpack Compose."
      }
    ]
  }

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-content">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-circle-1"></div>
          <div className="header-circle-2"></div>
          <h1>Internship Opportunities</h1>
          <p>Gain real-world experience in your field of interest</p>
        </motion.header>

        <section className="internship-section">
          <h2>Web Development</h2>
          <div className="internship-grid">
            {internships.web.map((internship, index) => (
              <InternshipCard
                key={index}
                {...internship}
                delay={index * 0.1}
                onApply={handleApply}
                onViewResources={handleViewResources}
                isApplied={appliedInternships.includes(internship.title)}
              />
            ))}
          </div>
        </section>

        <section className="internship-section">
          <h2>Mobile Development</h2>
          <div className="internship-grid">
            {internships.mobile.map((internship, index) => (
              <InternshipCard
                key={index}
                {...internship}
                delay={index * 0.1}
                onApply={handleApply}
                onViewResources={handleViewResources}
                isApplied={appliedInternships.includes(internship.title)}
              />
            ))}
          </div>
        </section>
      </div>

      {activeModal === 'apply' && (
        <ApplicationForm
          internship={currentInternship}
          onClose={closeModal}
          onSubmit={handleSubmitApplication}
        />
      )}

      {activeModal === 'resources' && (
        <ResourcesPanel
          internship={currentInternship}
          onClose={closeModal}
        />
      )}

      <Footer />
    </div>
  )
}

export default Dashboard