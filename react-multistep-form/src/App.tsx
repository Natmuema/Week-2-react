import {FormEvent} from "react"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./UserForm"
import { AddressForm } from "./AddressForm"
import { AccountForm } from "./AccountForm"
import {useState} from "react"

type FormData = {
  firstName:string
  lastName:string
  age:string
  street:string
  city:string
  state:string
  zip:string
  email:string
  password:string
}

const INITIAL_DATA:FormData  = {
  firstName:"",
  lastName:"",
  age:"",
  street:"",
  city:"",
  state:"",
  zip:"",
  email:"",
  password:"",
}

function App() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return {...prev, ...fields}
    })

  }
  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next,  } = 
  useMultistepForm([
  <UserForm {...data} updateFields={updateFields} />,
  <AddressForm {...data} updateFields={updateFields}  />,
  <AccountForm {...data} updateFields={updateFields}  />])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    next()
  }

  return (
    <>
      <div className="relative bg-black border border-white p-8 m-4 rounded-lg font-sans">
        <form onSubmit={onSubmit}>
          <div className="absolute top-2 right-2">
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div className="mt-4 flex gap-2 justify-end">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
  
}

export default App
