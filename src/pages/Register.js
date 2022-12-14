import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useSelector((store) => store.user);

  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };
  const [values, setValues] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password || (!values.isMember && !values.name)) {
      toast.error('Please fill out all fields');
      return;
    }
    const { name, email, password, isMember } = values;
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
    }
    if (!isMember) {
      dispatch(registerUser({ name: name, email: email, password: password }));
      return;
    }

    user && setValues(initialState);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    if (values.isMember) {
      setValues({
        isMember: false,
      });
    } else {
      setValues({
        isMember: true,
      });
    }
  };
  // navigate to dashboard if user is available
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {!values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn' disabled={isLoading}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
        <button type='submit' className='btn btn-block'>
          {isLoading ? 'loading' : 'submit'}
        </button>
      </form>
    </Wrapper>
  );
};
export default Register;
