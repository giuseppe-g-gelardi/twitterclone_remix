import { Form } from "@remix-run/react";

export default function LoginForm() {
  return (
    <div>
        <Form replace method='post' className="flex flex-col">
          <input type='text' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button type='submit' value='login' style={{ backgroundColor: 'lightBlue' }}>
            Login
          </button>
        </Form>
    </div>
  )
}
