import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Layout({ children }) {
  return (
    <main>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-8 min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Layout;
