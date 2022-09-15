import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OwnerAuthContext } from '../../context/OwnerAuthContext';
import * as yup from 'yup';
import { useFormik } from 'formik';
import './signup.css';
import { Link } from 'react-router-dom';
import URL from '../../api/global';

const OwnerSignup = () => {
  const { loading, error, dispatch } = useContext(OwnerAuthContext);

  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup
        .string('Enter your name')
        .max(25, 'Must be 25 characters or less')
        .required('* Required'),

      email: yup
        .string('Enter your email')
        .required('* Required')
        .email('Enter a vaild Email'),

      phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('* Required'),

      password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('*Password is required'),
    }),
    onSubmit: async (values) => {
      dispatch({ type: 'LOGIN_START' });
      try {
        await axios.post(`${URL}/ownerAuth/signup`, values);

        navigate('/owner-signin');
      } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      }
    },
  });

  return (
    <div className='login'>
      <div className='design'>
        <form onSubmit={formik.handleSubmit} className='lContainer'>
          <div className='inpCont'>
            <input
              type='text'
              placeholder='Name'
              id='name'
              name='name'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.name
                  ? '1px solid red'
                  : formik.values.name.length <= 25 &&
                    formik.values.name.length !== 0
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.name && formik.errors.name ? (
              <small style={{ color: 'red' }}>{formik.errors.name}</small>
            ) : null}
            {formik.values.name.length <= 25 &&
            formik.values.name.length !== 0 ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>
          <div className='inpCont'>
            <input
              type='email'
              placeholder='Email'
              id='email'
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.email
                  ? '1px solid red'
                  : formik.values.email !== '' && !formik.errors.email
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <small style={{ color: 'red' }}>{formik.errors.email}</small>
            ) : null}

            {formik.values.email !== '' && !formik.errors.email ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>
          <div className='inpCont'>
            <input
              type='number'
              placeholder='Phone Number'
              id='phone'
              name='phone'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.phone
                  ? '1px solid red'
                  : formik.values.phone !== '' && !formik.errors.phone
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <small style={{ color: 'red' }}>{formik.errors.phone}</small>
            ) : null}

            {formik.values.phone !== '' && !formik.errors.phone ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>
          <div className='inpCont'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.password
                  ? '1px solid red'
                  : formik.values.password !== '' && !formik.errors.password
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <small style={{ color: 'red' }}>{formik.errors.password}</small>
            ) : null}
            {formik.values.password.length >= 8 &&
            formik.values.password.length !== 0 ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>
          <div className='button-div'>
            <button className='lButton'>Sign Up</button>
          </div>
          <div>
            Have an account?{' '}
            <Link to={'/owner-signin'} style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </form>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default OwnerSignup;
