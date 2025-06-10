"use client"

import { Box, List, ListItem, ListItemText, Typography, styled } from "@mui/material"

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 200,
  backgroundColor: "#1a1a1a",
  height: "100vh",
  borderRight: "1px solid rgba(81, 81, 81, 0.5)",
  padding: theme.spacing(2, 0),
}))

const Logo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: "1.5rem",
  padding: theme.spacing(0, 2, 2, 2),
  marginBottom: theme.spacing(2),
}))

const NavItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(1, 2),
  cursor: "pointer",
  borderLeft: active ? `3px solid ${theme.palette.primary.main}` : "3px solid transparent",
  backgroundColor: active ? "rgba(255, 255, 255, 0.05)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "::before": {
    display: active ? "block" : "none",
    content: `"| "`,
    color: "#b4ff00",
  },
}))

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const navItems = [
    { id: "apps-discovery", label: "APPS DISCOVERY" },
    { id: "apps-inventory", label: "APPS INVENTORY" },
    { id: "settings", label: "SETTINGS" },
  ]

  return (
    <SidebarContainer>
      <Logo>reco</Logo>
      <List disablePadding>
        {navItems.map((item) => (
          <NavItem key={item.id} active={activeItem === item.id} onClick={() => onItemClick(item.id)}>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.75rem",
                fontWeight: activeItem === item.id ? 600 : 400,
              }}
            />
          </NavItem>
        ))}
      </List>
    </SidebarContainer>
  )
}
