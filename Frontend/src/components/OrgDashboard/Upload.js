import React, { useMemo, useState, useContext } from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { UserContext } from "../../context/UserContext";
const ipfsClient = require("ipfs-http-client");
const moment = require("moment");

const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

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

export default function Upload(props) {
  const {account, tokenContract, networkId} = useContext(UserContext)
  const [buffer, setBuffer] = useState();
  const [uploaderName, setUploaderName] = useState("");
  const [fileHash, setFileHash] = useState(null);
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

  const CaptureFile = (e) => {
    e.preventDefault();
    console.log("uploaded");
    console.log(e.target.files);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log("buffer = ", Buffer(reader.result));
      setBuffer(Buffer(reader.result));
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    const res = await ipfs.add(buffer);
    console.log(res);
    var timeStamp = moment().unix();
    console.log(timeStamp);
    await tokenContract.methods
      .sethashDetails(uploaderName, timeStamp, res.path)
      .send({ from: account });
    setFileHash(res.path);
  };

  return (
    <div className="container">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} onChange={CaptureFile} />
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
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 16,
          }}
        >
          <TextField
            id="verifiedBy"
            size="small"
            readOnly
            value="Verified by"
            variant="filled"
            InputProps={{ style: { borderColor: "red", color: "#008891" } }}
            fullWidth
          />
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
            onClick={onSubmit}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
