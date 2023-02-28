import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import resume from "../../assets/resume.pdf"

export interface ResumeModalProps {
  getModal: boolean,
  setModal: Function
}

const ResumeModal = (props:ResumeModalProps) => {
  const { getModal, setModal } = props;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  function handleModalClose() {
    setModal(false);
  }
  return (
    <>
  <Modal open={getModal} onClose={handleModalClose}>
    <Box style={{
      width: "50%",
      height: "80%",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      backgroundColor: "white"
    }}>
      <Box style={{ textAlign: "right" }}>
        <CloseIcon
          onClick={() => { handleModalClose() }} />
      </Box>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Viewer fileUrl={resume}
          plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </Box>
  </Modal>
  </>
  )
}

export default ResumeModal;