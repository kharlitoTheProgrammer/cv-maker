export default function MainLayout({ sidebar, main }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-300">
      <aside className="w-[670px] min-h-screen bg-gray-950">{sidebar}</aside>
      <main className="flex-1 p-4">{main}</main>
    </div>
  );
}
