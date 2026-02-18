import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { syncCurrentUser } from "./actions/user.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: "italic",
});

export const metadata = {
  title: "DevCollab",
  description: "A simple and light collaboration platform for modern developers.",
};

async function SyncUser() {
  await syncCurrentUser();
  return null;
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased font-sans`}>
          <SignedIn>
            <SyncUser />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
