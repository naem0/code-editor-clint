import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import toast from 'react-hot-toast';

const Editor = ({ socketRef, roomId, onCodeChange, data }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {
            try {
                editorRef.current = Codemirror.fromTextArea(
                    document.getElementById('realtimeEditor'),
                    {
                        mode: { name: 'javascript', json: true },
                        theme: 'dracula',
                        autoCloseTags: true,
                        autoCloseBrackets: true,
                        lineNumbers: true,
                    }
                );

                editorRef.current.on('change', (instance, changes) => {
                    const { origin } = changes;
                    const code = instance.getValue();
                    onCodeChange(code);
                    if (origin !== 'setValue') {
                        socketRef.current.emit("CODE_CHANGE", {
                            roomId,
                            code,
                        });
                    }
                });
            } catch (error) {
                console.error('Codemirror initialization error:', error);
                toast.error("Server Error, Try Again");
            }
        }
        init();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on("CODE_CHANGE", ({ code }) => {
                try {
                    if (code !== null) {
                        editorRef.current.setValue(code);
                    }
                } catch (error) {
                    console.error('Codemirror setValue error:', error);
                    toast.error("Server Error, Try Again");
                }
            });
        }

        return () => {
            // Clean up socket event listeners if needed
            // socketRef.current.off("CODE_CHANGE");
        };
    }, [socketRef.current]);

    return <textarea value={data?.code} id="realtimeEditor"></textarea>;
};

export default Editor;
