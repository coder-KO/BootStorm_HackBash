import React,{useState, useMemo} from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Header from "../../../components/Header";

const moment = require("moment");

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function Verify(props) {
  console.log(props.outputResult);
  const [visible, setVisible] = useState(false);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );


  return (
    <>
   
   <Header visible={visible} setVisible={setVisible} />
      <Grid
        container
        direction="column"
        justify="center"
        // spacing={5}
        alignItems="center"
      >
        <Grid
          container
          item
          xs={6}
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h2" gutterBottom>
              Verify Your Document
            </Typography>
          </Grid>

          {/* <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
           
            <object
              data={
                props.fileHash
                  ? `https://ipfs.infura.io/ipfs/${props.fileHash}`
                  : "https://picsum.photos/600/400"
              }
              width="600"
              height="400"
            ></object>
          </Grid> */}

          {(() => {
            if (props.outputResult) {
              if (props.outputResult.timestamp != 0) {
                return (
                  <Grid
                    container
                    item
                    //   xs={6}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    verified : by {props.outputResult.uploader_name}
                    Time :
                    {moment
                      .unix(props.outputResult.timestamp)
                      .format("dddd, MMMM Do, YYYY h:mm:ss A")}
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    container
                    item
                    //   xs={6}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    This document is not uploaded on blockchain. Or is Tampered
                  </Grid>
                );
              }
            } else {
              return <></>;
            }
          })()}

          

          <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            {/* <form onSubmit={props.OnSubmitFunction}>
              <input type="file" onChange={props.CaptureFile} />
              <input type="submit" />
            </form> */}
    
        <Grid item xs={12}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} onChange={props.CaptureFile} type="file"/>
            <p>
              Drag 'n' drop some files here, or click to select files to verify
            </p>
          </div>
        </Grid>

        <Grid
          itex
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Button
            variant="contained"
            style={{ background: "#008891", color: "#fff" }}
            onClick={props.OnSubmitFunction}
          >
            Verify
          </Button>
        </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}