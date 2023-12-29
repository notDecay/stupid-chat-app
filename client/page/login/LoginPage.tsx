import {
  type SubmitHandler, 
  createForm, 
  email, 
  required, 
  minLength, 
  FormError
} from "@modular-forms/solid"
import FormBackground from "../../components/form/background"
import {
  LoginForm
} from "../../api/login"
import { 
  FormContent, 
  FormHeader, 
  FormInput, 
  FormOptions, 
  FormSubmitButton 
} from "../../components/form/form"
import { AppRoutes } from "../../../config/app_config"

export default function LoginPage() {
  const [, Login] = createForm<LoginForm>()

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (!data.email.includes('gmail.com')) {
      throw new FormError<LoginForm>('', {
        email: 'Your email must end with "gmail.com"'
      })
    }
    console.log("submited :)")
  }

  return (
    <FormBackground>
      <FormContent FormComponent={Login.Form} onSubmit={onSubmit}>
        <FormHeader>Login</FormHeader>
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
        <Login.Field name="password" validate={[
          minLength(8, 'Your password should be at least 8 charators long'),
          required('Please enter your password')
        ]}>
          {(field, props) => <FormInput 
            {...props}
            type="password"
            label="Password"
            autocomplete="current-password"
            value={field.value}
            error={field.error}
            placeholder="Enter your supppper secret password"
            required 
          />}
        </Login.Field>
        <FormOptions.MoreOptions>
          <FormOptions.Option href={AppRoutes.register}>
            Uhh- I don't have a account (._.)
          </FormOptions.Option>
        </FormOptions.MoreOptions>
        <FormSubmitButton />
      </FormContent>
    </FormBackground>
  )
}