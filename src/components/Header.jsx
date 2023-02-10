export default function Header({ children: title = 'Título do Header' }) {
  return (
    <header>
      <div className="bg-gray-200 mx-auto p-4">
        <h1 className="text-center font-semibold text-xl">{title}</h1>
      </div>
    </header>
  );
}
