import { Form } from "@remix-run/react";

export default function SearchBar() {

  return (
    <div className="rounded-full">
      <Form>
        <div className="flex rounded-full h-12 w-full mt-2 mb-5 border-4">
          <input 
            type='text'
            name='userSearch'
            placeholder='Search for other users...'
            className="flex text-gray-500 rounded-xl w-full mx-2"
          />
        </div>
      </Form>
    </div>
  )
}
