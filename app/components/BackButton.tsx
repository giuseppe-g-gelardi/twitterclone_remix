import Icons from './Icons'

export default function BackButton({ text }: { text: string }) {
  return (
    <div className="px-5 my-2 z-20 flex sticky top-0 dark:bg-black bg-white">
      <button
        onClick={() => history.back()}
        className="flex font-bold p-1 mr-5 text-violet-500"
      >
        {Icons.backButton}
      </button>
      <h1 className="flex font-bold text-xl">
        {text}
      </h1>
    </div>
  )
}
