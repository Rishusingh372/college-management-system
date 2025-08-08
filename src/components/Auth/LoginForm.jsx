import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from './UI/Input'
import Button from './UI/Button'

const LoginForm = ({ onSubmit, loading }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    role: Yup.string().required('Please select a role')
  })

  return (
    <Formik
      initialValues={{ email: '', password: '', role: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && errors.password}
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm