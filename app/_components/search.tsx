"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"

const searchSchema = z.object({
  search: z.string().trim().min(1, { message: "Digite algo para buscar" }),
})

const Search = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

  const onSubmit = (data: z.infer<typeof searchSchema>) => {
    console.log(data)
    router.push(`/barbershops?search=${data.search}`)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Buscar" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  )
}

export default Search
