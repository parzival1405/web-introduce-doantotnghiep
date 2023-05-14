import { ImageListItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Logo from "../assets/logo.png";
const pages = [
  { value: "Trang chủ", href: "tc" },
  { value: "Giới thiệu", href: "gt" },
  { value: "Liên hệ", href: "lh" },
  { value: "Đặt lịch khám bệnh", href: "dl" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        background: "#4eb0ba",
        paddingLeft: "180px",
        paddingRight: "180px",
      }}
    >
      <Container
        maxWidth="xl"
        style={{
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <Toolbar
          disableGutters
          style={{
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <ImageListItem
            key={"logo"}
            style={{ width: "100px", margin: "20px" }}
          >
            <img src={Logo} alt="logo" loading="lazy" />
          </ImageListItem>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Phòng khám đa khoa Hidro(H2)
          </Typography>
        </Toolbar>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page.value}
                href={`#${page.href}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.value}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
