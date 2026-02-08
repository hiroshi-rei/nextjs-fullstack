"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MENUS = [
  { label: "Home", href: "/home" },
  { label: "Users", href: "/users" },
  { label: "Roles", href: "/roles" },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      {/* LEFT */}
      <nav className="flex items-center gap-10">
        {MENUS.map((menu) => {
          const isActive = pathname.startsWith(menu.href)

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                relative px-1 py-2 text-sm font-medium transition-colors duration-200
                ${isActive ? "text-blue-600" : "text-gray-600"}
                hover:text-blue-600
              `}
            >
              {menu.label}

              {/* active underline */}
              <span
                className={`
                  absolute left-0 -bottom-1 h-[2px] w-full rounded
                  bg-blue-600 transition-all duration-300
                  ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                `}
              />
            </Link>
          )
        })}
      </nav>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-700">
          {session?.user?.email}
        </span>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm font-medium text-red-600 transition hover:text-red-700 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
