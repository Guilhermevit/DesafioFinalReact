export default function Main({ children = <p>Conteúdo</p> }) {
  return (
    <main>
      <div className="container mx-auto p-4">{children}</div>
    </main>
  );
}
