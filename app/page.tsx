"use client"

import { useState, useEffect } from "react"
import { Box, Typography, styled } from "@mui/material"
import Sidebar from "@/components/sidebar"
import AppInventoryTable from "@/components/app-inventory-table"
import FiltersPanel from "@/components/filters-panel"
import ClientWrapper from "@/components/client-wrapper"

const AppContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#121212",
})

const ContentContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
})

const MainContent = styled(Box)({
  display: "flex",
  flex: 1,
  overflow: "hidden",
})

const TableContainer = styled(Box)({
  flex: 1,
  padding: "24px",
  overflow: "auto",
})

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 500,
}))

export default function HomePage() {
  const [activeNavItem, setActiveNavItem] = useState("apps-inventory")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item)
  }
  // Example: Add a new page for "settings"
  if (mounted && activeNavItem === "settings") {
    return (
      <ClientWrapper>
        <AppContainer>
          <Sidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />
          <ContentContainer>
            <MainContent>
              <TableContainer>
                <PageTitle variant="h1">Settings</PageTitle>
                <Box sx={{ color: "#fff" }}>Settings page content goes here.</Box>
              </TableContainer>
              <Box sx={{ width: 250, backgroundColor: "#1a1a1a" }} />
            </MainContent>
          </ContentContainer>
        </AppContainer>
      </ClientWrapper>
    )
  }
  if (!mounted) {
    return (
      <AppContainer>
        <Box sx={{ width: 200, backgroundColor: "#1a1a1a" }} />
        <ContentContainer>
          <MainContent>
            <TableContainer>
              <PageTitle variant="h1">App Inventory</PageTitle>
              <Box sx={{ height: 400, backgroundColor: "#1e1e1e" }} />
            </TableContainer>
            <Box sx={{ width: 250, backgroundColor: "#1a1a1a" }} />
          </MainContent>
        </ContentContainer>
      </AppContainer>
    )
  }

  return (
    <ClientWrapper>
      <AppContainer>
        <Sidebar activeItem={activeNavItem} onItemClick={handleNavItemClick} />

        <ContentContainer>
          <MainContent>
            <TableContainer>
              <PageTitle variant="h1">App Inventory</PageTitle>
              <AppInventoryTable />
            </TableContainer>
            <FiltersPanel />
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </ClientWrapper>
  )
}
