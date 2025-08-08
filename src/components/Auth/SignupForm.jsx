import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from './UI/Input'
import Button from './UI/Button'

const SignupForm = ({ onSubmit, loading }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required')
  })

  return (
    <Formik
      initialValues={{ name: '', email: '', mobile: '', id: '', role: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && errors.name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
          <Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            error={touched.mobile && errors.mobile}
          />
          <Input
            label={values.role === 'staff' ? 'Staff ID' : 'Student ID'}
            name="id"
            value={values.id}
            onChange={handleChange}
            error={touched.id && errors.id}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
            {touched.role && errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && errors.password}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SignupForm