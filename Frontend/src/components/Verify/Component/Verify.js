import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const moment = require("moment");
export default function Verify(props) {
  console.log(props.outputResult);

  return (
    <>
   

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

          <Grid
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
          </Grid>

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
            <form onSubmit={props.OnSubmitFunction}>
              <input type="file" onChange={props.CaptureFile} />
              <input type="submit" />
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}