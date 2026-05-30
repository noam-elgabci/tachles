import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
