const MODAL_STYLES = {
    width: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '10',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '10',
};
const MODEL_CLOSE_BUTTON_STYLES = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#aaa',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    backgroundColor: '#fff',
    border: 'none',
    zIndex: '11',
};

export default function Modal({ open, children, onClose }) {
    if (!open) {
        return null;
    }
    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <div>
                    <button style={MODEL_CLOSE_BUTTON_STYLES} type="button" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9.17 15.58c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l5.66-5.66c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L9.7 15.36c-.14.15-.34.22-.53.22Z"
                                fill="#2c3e50"
                            />
                            <path
                                d="M14.83 15.58c-.19 0-.38-.07-.53-.22L8.64 9.7a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l5.66 5.66c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
                                fill="#2c3e50"
                            />
                            <path
                                d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75Zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9Z"
                                fill="#2c3e50"
                            />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
