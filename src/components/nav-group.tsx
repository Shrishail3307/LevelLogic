import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup } from "@/components/app-shared";
import { ChevronRightIcon } from "lucide-react";

export function NavGroup({ label, items }: SidebarNavGroup) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            asChild
            className="group/collapsible"
            defaultOpen={
              !!item.isActive || item.subItems?.some((i) => !!i.isActive)
            }
            key={item.title}
          >
            <SidebarMenuItem>
              {item.subItems?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      isActive={item.isActive} 
                      tooltip={item.title}
                      className="group-data-[collapsible=icon]:justify-center"
                    >
                      {item.icon}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <a href={subItem.path}>
                              {subItem.icon}
                              <span className="group-data-[collapsible=icon]:hidden">
                                {subItem.title}
                              </span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton 
                  asChild 
                  isActive={item.isActive} 
                  tooltip={item.title}
                  className="group-data-[collapsible=icon]:justify-center"
                >
                  <a href={item.path}>
                    {item.icon}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
