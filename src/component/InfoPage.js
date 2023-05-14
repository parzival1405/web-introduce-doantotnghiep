import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const item = [
  {
    imageURL:
      "https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnew1.523d6c0e.jpg&w=1920&q=75",
    title2: "Đặt khám nhanh chóng",
    description:
      "Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ khám)",
  },
  {
    imageURL:
      "https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnew2.9868f07e.jpg&w=1920&q=75",
    title2: "Thanh toán dễ dàng",
    description: "Người dùng chọn và thực hiện thanh toán trên phần mềm",
  },
  {
    imageURL:
      "https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnew3.25a6d2c6.jpg&w=1920&q=75",
    title2: "Nhận phiếu trực tuyến",
    description: "Nhận phiếu trực tuyến",
  },
];

function InfoPage() {
  return (
    <div id="gt" style={{ height: "500px", padding: "50px 180px 0 180px" }}>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6" style={{ padding: "5px 0 5px 5px" }}>
              Giới thiệu
            </Typography>
            <Typography variant="h5" style={{ padding: "5px 0 5px 5px" }}>
              Hidro
            </Typography>
            <Typography variant="h5" style={{ padding: "5px 0 5px 5px" }}>
              Đặt lịch khám bệnh
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1">
            Hidro là giải pháp đặt lịch khám bệnh, chăm sóc sức khỏe trực tuyến
            cho cả gia đình. Người dùng chủ động trong việc khám chữa bệnh, được
            lựa chọn dịch vụ, chuyên khoa, bác sĩ tại các bệnh viện và phòng
            khám hàng đầu Việt Nam như Bệnh viện Đại học Y Dược TP.HCM, Bệnh
            viện Chợ Rẫy, Bệnh viện Nhi Đồng Thành Phố.
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop:"50px"}}>
        {item.map((item) => (
          <Grid item xs={4} key={item.imageURL}>
            <MediaCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function MediaCard({ imageURL, title2, description }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imageURL} title={title2} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title2}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{height:"50px"}}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Xem thêm</Button>
      </CardActions>
    </Card>
  );
}

export default InfoPage;
