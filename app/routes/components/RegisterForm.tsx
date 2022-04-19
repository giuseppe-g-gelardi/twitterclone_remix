import { Form } from "@remix-run/react";

export default function RegisterForm() {
  return (
    <div>
      <Form replace method='post' style={{ display: 'flex', flexDirection: 'column'}}>
        <input type='text' name='username' placeholder='Username' />
        <input type='email' name='email' placeholder='Email' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit' value='login' style={{ backgroundColor: 'lightBlue' }}>
          Login
        </button>
      </Form>
    </div>
  )
}
