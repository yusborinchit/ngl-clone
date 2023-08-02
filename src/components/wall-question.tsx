interface WallQuestionProps {
  userFrom?: string;
  createdAt: string;
  question: string;
}

function WallQuestion({ userFrom, createdAt, question }: WallQuestionProps) {
  console.log(createdAt);

  const date = new Date(Date.parse(createdAt));
  const formattedDate = Intl.DateTimeFormat("es-UR").format(date);

  return (
    <article className="p-4 border-l-4 border-gray-300 rounded shadow-md">
      <header className="flex items-center">
        <p className="text-xs font-black text-transparent bg-gradient-to-tr from-orange-500 to-pink-500 bg-clip-text">
          {userFrom ?? "Anonymous"}
        </p>
        <p className="ml-auto text-xs text-gray-500">{formattedDate}</p>
      </header>
      <p className="mt-2 text-sm break-all">{question}</p>
    </article>
  );
}

export default WallQuestion;
