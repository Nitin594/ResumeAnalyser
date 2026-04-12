import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <div className="font-bold text-lg">MyApp</div>

        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <Link href="/">Home</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 w-[200px]">
                <ul className="space-y-2">
                  <li><Link href="/feature1">Feature 1</Link></li>
                  <li><Link href="/feature2">Feature 2</Link></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing">Pricing</Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2">
          <button className="text-sm">Login</button>
          <button className="text-sm font-medium">Sign Up</button>
        </div>

      </div>
    </div>
  )
}