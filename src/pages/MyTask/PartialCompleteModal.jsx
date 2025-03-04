import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const partialCompleteOptions = [50, 75, 100];

import Button from "@mui/material/Button";

const PartialCompleteModal = () => {
  const [percent, setPercent] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handlePercentChange = (e, nextPercent) => {
    if (nextPercent !== null) {
      setPercent(nextPercent);
    }
  };

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>

      <CustomModal
        open={isOpen}
        onClose={handleClose}
        title="Partial Complete"
        actions={[
          <Button key="cancel" onClick={handleClose} color="inherit">
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handlePercentChange}
            variant="contained"
            color="primary"
          >
            Done
          </Button>,
        ]}
      >
        <ToggleButtonGroup
          value={percent}
          onChange={handlePercentChange}
          exclusive
          color="primary"
        >
          {partialCompleteOptions.map((item, index) => (
            <ToggleButton key={`Partial-option-${index}`} value={item}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CustomModal>
    </>
  );
};

export default PartialCompleteModal;
