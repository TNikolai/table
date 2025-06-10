"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { apiService } from "@/lib/api"

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function ApiDemo() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const userColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "company",
      headerName: "Company",
      width: 150,
      valueGetter: (value, row) => row.company?.name || "",
    },
  ]

  const postColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 400 },
    { field: "userId", headerName: "User ID", width: 100 },
  ]

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getUsers()
      setUsers(response.data)
    } catch (err) {
      setError("Failed to fetch users")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getPosts()
      setPosts(response.data.slice(0, 10)) // Limit to 10 posts for demo
    } catch (err) {
      setError("Failed to fetch posts")
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    try {
      setLoading(true)
      const response = await apiService.createPost(newPost)
      setPosts([response.data, ...posts])
      setOpenDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (err) {
      setError("Failed to create post")
      console.error("Error creating post:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            🌐 Axios API Demo
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Demonstrating API requests with axios using JSONPlaceholder API
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" onClick={fetchUsers} disabled={loading}>
              Refresh Users
            </Button>
            <Button variant="contained" onClick={fetchPosts} disabled={loading}>
              Refresh Posts
            </Button>
            <Button variant="outlined" onClick={() => setOpenDialog(true)}>
              Create Post
            </Button>
          </Box>

          {loading && (
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CircularProgress size={20} />
              <Typography variant="body2">Loading...</Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box display="flex" gap={1} mb={2}>
            <Chip label={`${users.length} Users`} color="primary" />
            <Chip label={`${posts.length} Posts`} color="secondary" />
          </Box>
        </CardContent>
      </Card>

      <Box display="flex" gap={3} flexDirection={{ xs: "column", lg: "row" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              👥 Users Data
            </Typography>
            <Box height={400}>
              <DataGrid
                rows={users}
                columns={userColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Posts Data
            </Typography>
            <Box height={400}>
              <DataGrid
                rows={posts}
                columns={postColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Create Post Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Body"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="User ID"
            type="number"
            fullWidth
            variant="outlined"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number.parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={createPost} variant="contained" disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
