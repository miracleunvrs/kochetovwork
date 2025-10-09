import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './App.css'

function App() {
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    course: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    country: '',
    phone: '',
    education: '',
    address: '',
    state: '',
    zipCode: ''
  }

  const validationSchema = Yup.object({
    // Required fields
    fullName: Yup.string()
      .trim()
      .required('Full name is required'),
    
    email: Yup.string()
      .trim()
      .email('Invalid email address')
      .required('Email is required'),
    
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
    course: Yup.string()
      .oneOf(['Course A', 'Course B', 'Course C'], 'Please select a course')
      .required('Please select a course'),
    
    gender: Yup.string()
      .oneOf(['Male', 'Female'], 'Please select gender')
      .required('Please select gender'),
    
    dateOfBirth: Yup.date()
      .required('Date of birth is required'),
    
    city: Yup.string()
      .trim()
      .required('City is required'),
    
    country: Yup.string()
      .required('Country is required'),
    
    // Optional fields with validation
    phone: Yup.string(),
    
    education: Yup.string(),
    
    address: Yup.string(),
    
    state: Yup.string(),
    
    zipCode: Yup.string()
      .matches(/^\d*$/, 'Zip code must contain only numbers')
  })

  const handleSubmit = (values, { setSubmitting }) => {
    // Remove empty optional fields for cleaner output
    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => {
        const optionalFields = ['phone', 'education', 'address', 'state', 'zipCode']
        return !optionalFields.includes(key) || (value && value.trim() !== '')
      })
    )

    alert(JSON.stringify(cleanedValues, null, 2))
    setSubmitting(false)
  }

  return (
    <div className="app">
      <h1 className="form-title">Course Application</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="course-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                />
                <ErrorMessage name="fullName" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <Field type="radio" name="course" value="Course A" />
                    Course A
                  </label>
                  <label className="radio-label">
                    <Field type="radio" name="course" value="Course B" />
                    Course B
                  </label>
                  <label className="radio-label">
                    <Field type="radio" name="course" value="Course C" />
                    Course C
                  </label>
                </div>
                <ErrorMessage name="course" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <Field type="radio" name="gender" value="Male" />
                    Male
                  </label>
                  <label className="radio-label">
                    <Field type="radio" name="gender" value="Female" />
                    Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="form-input"
                />
                <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className="form-input"
                />
                <ErrorMessage name="city" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <Field as="select" id="country" name="country" className="form-select">
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Russia">Russia</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="country" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education">Education</label>
                <Field as="select" id="education" name="education" className="form-select">
                  <option value="">Select Education</option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                </Field>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field
                  as="textarea"
                  id="address"
                  name="address"
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field
                  type="text"
                  id="state"
                  name="state"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <Field
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="form-input"
                />
                <ErrorMessage name="zipCode" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App
