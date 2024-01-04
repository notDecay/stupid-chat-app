import { 
  type SubmitHandler, 
  createForm, 
  email,
  required,
  FormError
} from "@modular-forms/solid"
import FormBackground from "../../components/form/FormBackground"
import {
  SignupForm
} from "../../api/login"
import { 
  FormContent, 
  FormHeader, 
  FormInput, 
  FormOptions, 
  FormSubmitButton 
} from "../../components/form"

export default function LoginPage() {
  const [, Login] = createForm<SignupForm>()

  const onSubmit: SubmitHandler<SignupForm> = ({
    confirmPassword,
    email,
    password,
    username
  }) => {
    if (password !== confirmPassword) {
      throw new FormError('', {
        confirmPassword: 'Your confirm password does not match with your password'
      })
    }
    
    console.log("submited :)")
  }

  return (
    <FormBackground>
      <FormContent FormComponent={Login.Form} onSubmit={onSubmit}>
        <FormHeader>Register</FormHeader>
        <Login.Field name="username" validate={[
          required('Please enter your username'),
        ]}>
          {(field, props) => <FormInput 
            {...props}
            type="text"
            label="Username"
            value={field.value}
            error={field.error}
            placeholder="What should I call you?"
            required 
          />}
        </Login.Field>
        <Login.Field name="password" validate={[
          required('Please enter your password'),
        ]}>
          {(field, props) => <FormInput 
            {...props}
            type="password"
            label="Password"
            value={field.value}
            error={field.error}
            placeholder="Your super secret password"
            required 
          />}
        </Login.Field>
        <Login.Field name="confirmPassword" validate={[
          required('Please re-enter your password'),
        ]}>
          {(field, props) => <FormInput 
            {...props}
            type="password"
            label="Confirm your password"
            value={field.value}
            error={field.error}
            placeholder="Just enter your password again"
            required 
          />}
        </Login.Field>
        <Login.Field name="email" validate={[
          email('The email is badly formated'),
          required('Please enter your email'),
        ]}>
          {(field, props) => <FormInput 
            {...props}
            type="email"
            label="Email"
            value={field.value}
            error={field.error}
            placeholder="Example. something@gmail.com"
            required 
          />}
        </Login.Field>
        <FormOptions.MoreOptions>
          <FormOptions.Option href="/login">
            I think I already created a alt
          </FormOptions.Option>
        </FormOptions.MoreOptions>
        <FormSubmitButton />
      </FormContent>
    </FormBackground>
  )
}