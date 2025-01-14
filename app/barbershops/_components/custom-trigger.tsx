import AppSidebar from "../../_components/app-sidebar"

import { SidebarTrigger } from "../../_components/ui/sidebar"

const CustomTrigger = () => {
  return (
    <div>
      <SidebarTrigger
        size="icon"
        variant="secondary"
        className="absolute right-4 top-4"
      />
      <AppSidebar />
    </div>
  )
}

export default CustomTrigger
