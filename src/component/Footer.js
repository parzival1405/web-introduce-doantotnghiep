import { Grid, ImageListItem, Link, Typography } from "@mui/material";
import React from "react";

import Logo from "../assets/logo.png";
function Footer() {
  return (
    <div
      id="gt"
      style={{
        background: "#4eb0ba",
        paddingLeft: "180px",
        paddingRight: "180px",
        marginTop: "50px",
      }}
    >
      <Grid container rowSpacing={1}>
        <Grid xs={3}>
          <ImageListItem
            key={"logo"}
            style={{ width: "100px", margin: "20px" }}
          >
            <img src={Logo} alt="logo" loading="lazy" />
          </ImageListItem>
        </Grid>

        <Grid xs={6}>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Hidro - ĐẶT LỊCH KHÁM BỆNH
          </Typography>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh
          </Typography>
          <Typography
            component={Link}
            variant="body1"
            style={{ color: "#fff", textDecoration: "none" ,padding:"5px 0 5px 5px"}}
          >
            Website: https://www.facebook.com/profile.php?id=100012744793680
          </Typography>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Email: bqhuu130375@gmail.com
          </Typography>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Điện thoại: 0975247624
          </Typography>
        </Grid>

        <Grid xs={3}>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Liên hệ
          </Typography>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Điều khoản dịch vụ
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#fff",padding:"5px 0 5px 5px"  }}
          >
            Chính sách bảo mật
          </Typography>
          <Typography variant="body1" style={{ color: "#fff",padding:"5px 0 5px 5px" }}>
            Quy định sử dụng{" "}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
