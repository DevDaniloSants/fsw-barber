import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none">
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">
            © 2025 Copyright <span className="font-semibold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
