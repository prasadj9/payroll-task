import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useMembers from "../../hooks/useMembers";
import useDebounce from "../../hooks/useDebounce";
import { throttle } from "lodash";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const MembersList = ({ open, handleClose, setcheckedMembers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const containerRef = useRef(null);
  const debounceSearch = useDebounce(searchTerm, 1000);
  const { members, fetchMoreMembers, loading } = useMembers(
    debounceSearch,
    1000
  );

  const handleScroll = throttle(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreMembers();
      }
    }
  }, 200);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.UserId === member.UserId);
      if (isSelected) {
        return prev.filter((m) => m.UserId !== member.UserId);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleSubmit = () => {
    setcheckedMembers(selectedMembers);
    setSelectedMembers([]);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="div">
        <Typography variant="h6">Members</Typography>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search"
          margin="dense"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div
          style={{ maxHeight: 300, overflowY: "auto", marginTop: 10 }}
          onScroll={handleScroll} // Attach the scroll handler here
          ref={containerRef}
        >
          {members.map((member) => (
            <div key={member.UserId}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedMembers?.some(
                      (m) => m.UserId === member.UserId
                    )}
                    onChange={() => handleCheckboxChange(member)}
                  />
                }
                label={member.Name}
              />
              <br />
            </div>
          ))}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Done
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default MembersList;
