import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col gap-6">
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
}
