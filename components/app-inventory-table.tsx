"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  TablePagination,
  CircularProgress,
  styled,
  Button,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import {apiService} from "@/lib/api"

// Define app data structure

// Sample app data
const defaultAppData: AppData[] = [
  { id: "1", name: "Zoom", icon: "Z", category: "Video Conferencing", connected: true },
  { id: "2", name: "Slack", icon: "S", category: "IM", connected: true },
  { id: "3", name: "XSOAR", icon: "X", category: "Security Automation", connected: true },
  { id: "4", name: "Torq", icon: "T", category: "Security Automation", connected: true },
  { id: "5", name: "Virtu", icon: "V", category: "Financial", connected: true },
  { id: "6", name: "Tines", icon: "T", category: "Automation", connected: true },
  { id: "7", name: "Splunk", icon: "S", category: "Monitoring", connected: true },
  { id: "8", name: "Sharepoint", icon: "S", category: "Drive", connected: true },
  { id: "9", name: "App 9", icon: "", category: "Category", connected: true },
  { id: "10", name: "App 10", icon: "", category: "Category", connected: true },
  { id: "11", name: "App 11", icon: "", category: "Category", connected: true },
  { id: "12", name: "App 12", icon: "", category: "Category", connected: true },
  { id: "13", name: "App 13", icon: "", category: "Category", connected: false },
  { id: "14", name: "App 14", icon: "", category: "Category", connected: false },
  { id: "15", name: "App 15", icon: "", category: "Category", connected: false },
]
interface AppData {
  id: string
  name: string
  icon: string
  category: string
  connected: boolean
}

// Styled components
const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#1e1e1e",
  borderRadius: 0,
  boxShadow: "none",
})

const StyledTableCell = styled(TableCell)({
  borderBottom: "1px solid rgba(81, 81, 81, 0.5)",
})

const StyledTableHeaderCell = styled(TableCell)({
  borderBottom: "1px solid rgba(81, 81, 81, 0.5)",
  fontWeight: 600,
  color: "#ffffff",
})

const AppIcon = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  fontSize: "0.875rem",
  backgroundColor: theme.palette.grey[700],
  marginRight: theme.spacing(1),
}))

const ConnectionIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const DisconnectedIcon = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.grey[500],
  width: "20px !important",
  height: "20px !important",
}))

const AppNameContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
})

export default function AppInventoryTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [mounted, setMounted] = useState(false)
    const filterParams = {
      appName: 'appName',
      category: 'Category',
      pageNumber: 0,
      pageSize: 25
  };

  const [appData, setApps] = useState<AppData[]>(defaultAppData)

  // create window event listener to handle filter changes
  useEffect(() => {
    const handleFilterChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const { detail } = customEvent
      const { appName, category } = detail
      // Update filterParams based on the event details
      console.log("Filter change event received:", detail);
      if (appName) {
        filterParams.appName = appName
      }
      if (category) {
        filterParams.category = category
      }
      // Fetch apps with updated filter parameters
      fetchApps()
    }

    window.addEventListener("filterChange", handleFilterChange as EventListener)
    return () => {
      window.removeEventListener("filterChange", handleFilterChange as EventListener)
    }
  }, [])

  const fetchApps = async () => {
    try {
      const response = await apiService.getApps(filterParams)
      console.log("Fetched apps:", response.data)

      const mappedApps = response.data.appRows.map((app: any) => ({
        id: app.appId,
        name: app.appName,
        icon: app.appSources[0] ? app.appSources[0][0].toUpperCase() : "", // Use first source as icon
        category: app.category,
        connected: true, // Assuming all fetched apps are connected for now
      }))

      console.log(response.data, "Mapped apps:", mappedApps);

      setApps(mappedApps || [])
      setRowsPerPage(filterParams.pageSize || 25);
    } catch (err) {
      // setError("Failed to fetch users")
      console.error("Error fetching apps:", err)
      setApps(defaultAppData)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }


  // Calculate pagination
  console.log("App data:", appData);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - appData?.length) : 0
  const visibleRows = appData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (!mounted) {
    return (
      <Box>
        <StyledTableContainer component={Paper}>
          <Table aria-label="app inventory table">
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Category</StyledTableHeaderCell>
                <StyledTableHeaderCell>Connection</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    <AppNameContainer>
                      <AppIcon> </AppIcon>
                      <Typography variant="body1">Loading...</Typography>
                    </AppNameContainer>
                  </StyledTableCell>
                  <StyledTableCell>Loading...</StyledTableCell>
                  <StyledTableCell>Loading...</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    )
  }

  return (
    <Box>
      <StyledTableContainer component={Paper}>
        <Table aria-label="app inventory table">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Category</StyledTableHeaderCell>
              <StyledTableHeaderCell>Connection</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((app) => (
              <TableRow key={app.id} hover>
                <StyledTableCell>
                  <AppNameContainer>
                    <AppIcon>{app.icon}</AppIcon>
                    <Typography variant="body1">{app.name}</Typography>
                  </AppNameContainer>
                </StyledTableCell>
                <StyledTableCell>{app.category}</StyledTableCell>
                <StyledTableCell>
                  {app.connected ? (
                    <Box display="flex" alignItems="center">
                      <ConnectionIcon fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        Reco
                      </Typography>
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <DisconnectedIcon />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        Connection
                      </Typography>
                    </Box>
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={appData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#b0b0b0",
          ".MuiTablePagination-selectIcon": {
            color: "#b0b0b0",
          },
        }}
      />
    </Box>
  )
}
