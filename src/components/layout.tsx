import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer className="relative z-20" />
    </div>
  );
}
