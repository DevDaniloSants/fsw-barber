import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleSignInClick = () => signIn("google")
  return (
    <>
      <DialogHeader className="flex items-center justify-center">
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={"outline"}
        className="flex w-full gap-2 rounded-lg"
        onClick={handleSignInClick}
      >
        <Image src={"/Google.svg"} alt="google" width={16} height={16} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
