import { yupResolver } from '@hookform/resolvers/yup';
import { IonButton, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonLabel, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputRow from '../components/InputRow';

export type SignUpType = {
  password: string;
  confirmPassword: string;
  email: string;
  username: string;
  dob: Date;
  agree: NonNullable<boolean>
}

const schema = yup.object().shape({
  username: yup.string().min(4, 'Username must be at least 4 characters long').required('Username is required'),
  dob: yup.date().max(new Date(), 'Date of birth cannot be in the future').required('Date of birth is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  agree: yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions')
});

const SignUp: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors, isValid }, setError } = useForm<SignUpType>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange"
  });
  const [formValue, setFormValue] = useState({
    username: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const onSubmit = (signUpData: SignUpType) => {
    console.log(signUpData);
    alert('Submitted');
  }

  return (
    <IonPage className='signup-container' >
      <IonContent fullscreen class='signup' >
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='flex flex-col h-full'>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div>
                    <h1>Let’s get you started</h1>
                    <p className='mt-[16px]'>Already have an account? <Link to="/login" className='link login' >Login</Link></p>
                  </div>
                </IonCol>
              </IonRow>
              <InputRow name="username" errors={errors} label='Username' input={{ type: 'text', placeholder: 'Enter username', ...register('username') }} />
              <InputRow name="dob" errors={errors} label='Date of birth' input={{ type: 'date', required: true, ...register('dob') }} />
              <InputRow name="email" errors={errors} label='Email address' input={{ type: 'text', placeholder: 'Enter email address', ...register('email') }} />
              <InputRow name="password" errors={errors} label='Password' input={{ type: 'password', placeholder: 'Enter password', passwordToggle: true, required: true, ...register('password') }} hintText="Password should contain at least 8 characters, 1 special symbol character, 1 number, 1 uppercase letter" />
              <InputRow name="confirmPassword" errors={errors} label='Confirm password' input={{ type: 'password', placeholder: 'Confirm password', passwordToggle: true, required: true, ...register('confirmPassword') }} />
              <IonRow className='mt-[24px]'>
                <IonCol>
                  <div className='vertical-center' >
                    <Controller
                      control={control}
                      name="agree"
                      render={({ field: { value, onChange } }) => (
                        <IonCheckbox
                          checked={value}
                          onIonChange={({ detail: { checked } }) => onChange(checked)}
                        />
                      )}
                    />
                    <IonLabel>I agree to the <Link to="toc" className='link' >Terms and Conditions</Link> and <Link to="/privacy-policy" className='link'> Privacy Policy</Link> of this app.</IonLabel>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton onClick={handleSubmit(onSubmit)} disabled={!isValid} type='submit' expand='block'>Create Account</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default SignUp;
