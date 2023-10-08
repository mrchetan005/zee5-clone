
import store from '../../store';
import { setWindowSize } from '../../store/slices/windowSize';

import { debounce } from './functionsUtil';

const handleResize = () => {
    const { innerWidth } = window;
    store.dispatch(setWindowSize({ width: innerWidth }));
};

const debounceFunction = debounce(handleResize, 700);

const startListeningToResize = () => {
    window.addEventListener('resize', debounceFunction);
};

const stopListeningToResize = () => {
    window.removeEventListener('resize', debounceFunction);
};

export { startListeningToResize, stopListeningToResize };
