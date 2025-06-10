"use client"

import { Box, Typography, Paper, styled } from "@mui/material"

const FiltersContainer = styled(Paper)(({ theme }) => ({
  width: 250,
  backgroundColor: "#1a1a1a",
  height: "100%",
  padding: theme.spacing(2),
  borderRadius: 0,
  boxShadow: "none",
}))

const FilterSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

const FilterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

export default function FiltersPanel() {
  return (
    <FiltersContainer>
      <Typography variant="h6">Filters</Typography>

      <FilterSection>
        <FilterTitle variant="body2">Name Filter</FilterTitle>
        <input
          type="text"
          placeholder="Enter name"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
            marginBottom: "8px"
          }}
          onInput={e => {
            const value = (e.target as HTMLInputElement).value
            // You can use a callback or context to notify app-inventory-table
            // For example, using a custom event:
            window.dispatchEvent(new CustomEvent("filterChange", { detail: { appName: value } }))
          }}
        />
        <input
          type="text"
          placeholder="Enter category"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
            marginBottom: "8px"
          }}
          onInput={e => {
            const value = (e.target as HTMLInputElement).value
            // You can use a callback or context to notify app-inventory-table
            // For example, using a custom event:
            window.dispatchEvent(new CustomEvent("filterChange", { detail: { category: value } }))
          }}
        />
            </FilterSection>
    </FiltersContainer>
  )
}
