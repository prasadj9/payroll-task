import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useMembers from '../../hooks/useMembers';
import useDebounce from '../../hooks/useDebounce';
import { throttle } from 'lodash';

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

const MembersListContent = ({ members = [], selectedMembers, handleCheckboxChange, loading, handleScroll }) => (
    <div
      style={{ maxHeight: 300, overflowY: "auto", marginTop: 10 }}
      onScroll={handleScroll} // Attach the scroll handler here
    >
      {members.map((member) => (
        <div key={member.UserId}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMembers[member.UserId] || false}
                onChange={() => handleCheckboxChange(member.UserId)}
              />
            }
            label={member.Name}
          />
          <br />
        </div>
      ))}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );

const MembersListActions = ({ handleClose }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
    <Button onClick={handleClose} variant="outlined" style={{ marginRight: 10 }}>
      Cancel
    </Button>
    <Button onClick={handleClose} variant="contained" color="primary">
      Done
    </Button>
  </div>
);

const MembersList = ({ open, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState({});
  const containerRef = useRef(null);
  const debounceSearch = useDebounce(searchTerm, 1000);
  const { members, fetchMoreMembers, loading } = useMembers(debounceSearch, 1000);

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

  const handleCheckboxChange = (userId) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [userId] : !prev[userId] 
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="div">
        <Typography variant="h6">Members</Typography>
        <TextField
          value={`Members (${Object.keys(selectedMembers)?.length || 0} selected)`}
          variant="standard"
          InputProps={{ readOnly: true }}
          required
        />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search"
          margin="dense"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <MembersListContent
          members={members}
          selectedMembers={selectedMembers}
          handleCheckboxChange={handleCheckboxChange}
          loading={loading}
          handleScroll={handleScroll}
        />
        <MembersListActions handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default MembersList;