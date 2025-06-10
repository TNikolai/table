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
        {/* Filter controls would go here */}
      </FilterSection>

      <FilterSection>
        <FilterTitle variant="body2">Category Filter</FilterTitle>
        {/* Filter controls would go here */}
      </FilterSection>
    </FiltersContainer>
  )
}
