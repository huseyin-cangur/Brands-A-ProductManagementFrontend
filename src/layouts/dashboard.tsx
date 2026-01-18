import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box, Button, Stack } from '@mui/material';
import { useAppDispatch } from '../hooks/hooks';
import { clearAuth } from '../pages/Login/AuthSlice';


export default function Layout() {


  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  return (
    <DashboardLayout
      slots={{
        toolbarActions: () => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={() => {
                dispatch(clearAuth())
                localStorage.removeItem("accessToken")
                navigate("/login");

              }}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
                padding: "4px 12px",
              }}
            >
              Çıkış yap
            </Button>
          </Box>
        ),
      }}
    >
    

      <Outlet />
    </DashboardLayout>
  );
}