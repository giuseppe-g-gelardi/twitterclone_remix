import Icons from './Icons'

export default function BackButton({ text }: any) {
  return (
    <div className="px-5 my-2 flex">
    <button
      onClick={() => history.back()}
      className="flex font-bold p-1 mr-5 text-indigo-500"
    >
      {Icons.backButton}
    </button>
    <h1 className="flex font-bold text-xl">
      {text}
    </h1>
  </div>
  )
}
