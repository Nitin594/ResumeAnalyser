import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AuthTabs() {
  return (
    <div className="flex justify-center items-center min-h-screen dark">
      <Tabs defaultValue="login" className="w-[400px]">
        
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* LOGIN */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" />
              </div>

              <Button className="w-full">Login</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SIGNUP */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Sign up to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="John Doe" />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" />
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" />
              </div>

              <Button className="w-full">Sign Up</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}