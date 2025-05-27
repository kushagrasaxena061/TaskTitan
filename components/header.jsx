import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { PenBox } from "lucide-react";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

async function Header() {
  await checkUser();

  return (
    <header className="bg-gradient-to-b from-[#121010] to-[#121220] shadow-lg border-b border-gray-600">
      <nav className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            <Image
              src="/logo.png"
              alt="logo missing"
              width={300}
              height={100}
              className="h-10 w-auto object-contain"
              priority
            />
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button
              variant="destructive"
              className="flex items-center gap-2 hover:shadow-md transition-all hover:scale-105"
            >
              <PenBox size={18} />
              <span className="hidden md:inline">Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button
                variant="outline"
                className="border-purple-100 text-white hover:bg-purple-900/30 transition-all"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>

      <UserLoading />
    </header>
  );
}

export default Header;
