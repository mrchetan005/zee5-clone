// /* eslint-disable react/prop-types */

// import { useEffect } from 'react';
// import MicNoneIcon from "@mui/icons-material/MicNone";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { IconButton, Tooltip } from '@mui/material';


// const SpeechRecognitionSearch = ({ setSearchValue }) => {
//     const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//     useEffect(() => {
//         if (transcript) {
//             setSearchValue(transcript);
//             resetTranscript();
//         }
//     }, [transcript]);

//     if (!browserSupportsSpeechRecognition) {
//         return <></>;
//     }

//     const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

//     return (
//         <div>
//             <Tooltip title={'hold to talk'}>
//                 <IconButton color='inherit' onTouchStart={startListening}
//                     onMouseDown={startListening}
//                     onTouchEnd={SpeechRecognition.stopListening}
//                     onMouseUp={SpeechRecognition.stopListening}>
//                     <MicNoneIcon />
//                 </IconButton>
//             </Tooltip>
//         </div>
//     );
// };

// export default SpeechRecognitionSearch;


