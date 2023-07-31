interface WallQuestionProps {
  userFrom: string;
  question: string;
}

function WallQuestion({ userFrom, question }: WallQuestionProps) {
  return (
    <article className="p-4 mt-4 border-l-4 border-gray-200">
      <header>
        <p className="text-xs font-bold text-transparent bg-gradient-to-tr from-orange-500 to-pink-500 bg-clip-text">
          From: {userFrom}
        </p>
      </header>
      <p className="mt-2 text-sm break-all">{question}</p>
    </article>
  );
}

export default WallQuestion;
