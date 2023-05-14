import React, { useEffect, useState, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import DateLabel from "../Form/ControlsLabel/DateLabel";
import SelectedLabel from "../Form/ControlsLabel/SelectLabel";
import InputLabel from "../Form/ControlsLabel/InputLabel";
import { makeStyles } from "@mui/styles";
import { Send } from "@mui/icons-material";
import * as api from "../api";
import QRCode from "qrcode";
import { Buffer } from "buffer";
import { getCurrentDateString } from "../utils/Calc";

const initialValues = {
  patient: {},
  service: null,
  doctor: null,
  dateOfExamination: null,
};

const optionsSex = [
  {
    id: "true",
    title: "Nam",
  },
  { id: "false", title: "Nữ" },
];

const optionsTimeSlot = [
  {
    id: "1",
    title: "9h - 10h",
  },
  { id: "2", title: "10h - 11h" },
];

const optionsDoctor = [
  { id: 1, fullName: "BS 1" },
  {
    id: 2,
    fullName: "BS 2",
  },
  { id: 3, fullName: "BS 3" },
];

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
    padding: "20px",
  },
  action: {
    display: "flex",
    width: "100%",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  table: {
    "& th,& td": {
      padding: "10px",
    },
    "& .MuiRadio-root": {
      padding: "2px",
    },
    "& .MuiFormControlLabel-root": {
      margin: "0",
    },
  },
  gridCustomInput: {
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
}));

function BodyPage({socket}) {
  const [services, setServices] = useState([]);

  const classes = useStyle();
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async (id) => {
    try {
      const response = await QRCode.toDataURL(id + "");
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async (values) => {
    const formData = {
      date: values.dateOfExamination,
      doctor_id: values?.doctor.id,
      service_id: values.service.id,
      phoneNumber: values.patient?.phoneNumber,
      patientName: values.patient?.fullName,
      address: values.patient?.address,
      date_of_birth: values.patient?.dateOfBirth,
      sex: values.patient?.sex.id,
      timeSlot: null,
      creator_id: 1,
      status: "WAIT",
      // description: "Tai Kham",
    };

    const { data } = await api.saveMedicalLetters(formData);

    if (data) {
      await generateQrCode(data.id);
      // const imgUrl2 = convert(imageUrl)
      // console.log(imgUrl2)
      // await api.sendEmail({ linkQR: imgUrl2, email: values.patient?.email });
      if (values.dateOfExamination === getCurrentDateString()) {
        socket.current.emit("sendMedicalLetter", JSON.stringify(data));
      }
    }
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    // atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''))
    const byteCharacters = Buffer.from(b64Data, "base64");
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice[i];
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const convert = (base64) => {
    const contentType = "image/png";
    // const b64Data = base64.split(",")[1];
    const blob = b64toBlob(base64, contentType);
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    const callApi = async () => {
      const servicesResponse = await api.getAllService();
      setServices(servicesResponse.data);
    };
    callApi();
  }, []);

  const handleChangeDate = (field, value, setFieldValue) => {
    setFieldValue(field, value);
  };
  return (
    <Paper
      id="dl"
      className={classes.paper}
      style={{ margin: "auto" }}
      sx={{ mt: "3", mb: "3" }}
    >
      ĐĂNG KÝ KHÁM vui lòng điền thông tin vào form bên dưới để đẩ đăng ký khám
      bệnh theo yêu cầu
      <Formik
        initialValues={initialValues}
        //   validationSchema={validateionChangeGroupName}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmitForm(values);
          setSubmitting(true);
          // resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form
            action=""
            //   className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container rowSpacing={1} className={classes.gridCustomInput}>
              <InputLabel
                name="patient.fullName"
                value={values["patient"]?.fullName}
                label="Tên bệnh nhân"
                onChange={handleChange}
                require={true}
                size={[2, 6]}
              />
              {/* <Grid item xs={2} /> */}
              <SelectedLabel
                accessField="title"
                options={optionsSex}
                setFieldValue={setFieldValue}
                label="Giới tính"
                name="patient.sex"
                value={values["patient"]?.sex}
                require={true}
                size={[2, 2]}
              />
              <InputLabel
                label="Điện thoại liên hệ"
                name="patient.phoneNumber"
                require={true}
                size={[2, 2]}
                value={values["patient"]?.phoneNumber}
                onChange={handleChange}
              />
              {/* <Grid item xs={2} /> */}
              <DateLabel
                onChange={(value) =>
                  handleChangeDate("patient.dateOfBirth", value, setFieldValue)
                }
                name="patient.dateOfBirth"
                value={values["patient"]?.dateOfBirth}
                label="Ngày sinh"
                size={[2, 2]}
              />
              <InputLabel
                onChange={handleChange}
                name="patient.email"
                label="Email"
                value={values["patient"]?.email}
                size={[2, 2]}
              />
              {/* <Grid item xs={2} /> */}
              <InputLabel
                name="patient.address"
                onChange={handleChange}
                value={values["patient"]?.address}
                label="Địa chỉ"
                size={[2, 10]}
              />
              <DateLabel
                // currentDate={true}
                onChange={(value) =>
                  handleChangeDate("dateOfExamination", value, setFieldValue)
                }
                setFieldValue={setFieldValue}
                name="dateOfExamination"
                value={values?.dateOfExamination}
                disablePast={true}
                label="Ngày Khám"
                require={true}
                size={[2, 3]}
              />
              <Grid item xs={3} />
              <SelectedLabel
                accessField="title"
                name="timeSlot"
                options={optionsTimeSlot}
                setFieldValue={setFieldValue}
                label="Khung giờ"
                size={[2, 2]}
              />
              <SelectedLabel
                options={services}
                accessField={"name"}
                setFieldValue={setFieldValue}
                name="service"
                value={values?.service}
                label="Loại khám"
                require={true}
                size={[2, 2]}
              />
              <InputLabel
                disable={true}
                value={values.service?.price}
                label="Tổng tiền"
                size={[2, 2]}
              />
              <SelectedLabel
                value={values?.doctor}
                options={optionsDoctor}
                accessField={"fullName"}
                setFieldValue={setFieldValue}
                name="doctor"
                label="Bác sĩ khám"
                size={[2, 2]}
              />
            </Grid>
            <div className={classes.action}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                startIcon={<Send />}
              >
                Gửi
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {imageUrl ? (
        <a href={imageUrl} download>
          <img src={imageUrl} alt="img" />
        </a>
      ) : null}
    </Paper>
  );
}

export default BodyPage;
