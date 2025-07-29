// import React, { useState, useEffect } from 'react';
// import { MdClose, MdDelete, MdEdit } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import Modal from 'react-modal';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         width: "90%",
//         border: "1px solid black",
//         transform: 'translate(-50%, -50%)',
//         maxWidth: "600px",
//     },
// };

// const Notes = ({ mode, setmode }) => {
//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     const [title, setTitle] = useState("");
//     const [stitle, setsTitle] = useState("");
//     const [sdescription, setsDescription] = useState("");
//     const [description, setDescription] = useState("");
//     const [notes, setNotes] = useState([]);
//     const [message, setmessage] = useState("");

//     const fetchData = async () => {
//         try {
//             const response = await fetch('https://inotebook-api-cyan.vercel.app/api/notes/fetchallnotes', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'authorization': localStorage.getItem('token')
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch notes');
//             }
//             const data = await response.json();
//             setNotes(data);
//             setTitle("")
//             setDescription("")
//         } catch (error) {
//             console.error('Error fetching notes:', error.message);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const addNote = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("https://inotebook-api-cyan.vercel.app/api/notes/addnote", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization: localStorage.getItem("token"),
//                 },
//                 body: JSON.stringify({ title, description }),
//             });
//             if (!response.ok) {
//                 throw new Error("Failed to add note");
//             }
//             const newNote = await response.json();
//             setNotes([...notes, newNote]);
//             fetchData();
//             setmessage("Notes Added Successfully.")
//             setTimeout(() => {
//                 setmessage("")
//             }, 1500);
//             closeModal();
//         } catch (error) {
//             console.error("Error adding note:", error.message);
//         }
//     };

//     const deleteNote = async (id) => {
//         try {
//             const c = window.confirm("Are you sure you want to delete this note?");
//             if (c) {
//                 await fetch(`https://inotebook-api-cyan.vercel.app/api/notes/deletenote/${id}`, {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json",
//                         authorization: localStorage.getItem("token"),
//                     },
//                 });
//                 fetchData();
//                 setmessage("Notes deleted successfully.")
//                 setTimeout(() => {
//                     setmessage("")
//                 }, 1500);
//                 setNotes(notes.filter((note) => note._id !== id));
//             }
//         } catch (error) {
//             console.error("Error deleting note:", error.message);
//         }
//     };

//     const updateNote = async (id) => {
//         try {
//             const response = await fetch(`https://inotebook-api-cyan.vercel.app/api/notes/updatenote/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization: localStorage.getItem("token"),
//                 },
//                 body: JSON.stringify({ title, description }), // Include the updated title and description
//             });
//             if (!response.ok) {
//                 throw new Error("Failed to update note");
//             }
//             setNotes(
//                 notes.map((note) =>
//                     note._id === id ? { ...note, title, description } : note
//                 )
//             );
//             setmessage("Note updated successfully.");
//             setTimeout(() => {
//                 setmessage("");
//             }, 1500);
//             closeModal();
//             setopenEdit(false);

//         } catch (error) {
//             console.error("Error updating note:", error.message);
//         }
//     };

//     function openModal() {
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     const [id, setid] = useState();
//     const [openEdit, setopenEdit] = useState(false);

//     const handleupdateNote = (id, title, description) => {
//         setTitle(title);
//         setDescription(description);
//         setid(id);
//         setopenEdit(true);
//         // openModal();
//     }

//     const handleShow = (title, description) => {
//         setshow(true);
//         setsTitle(title)
//         setsDescription(description)
//     }
//     const [show, setshow] = useState(false);

//     return (
//         <div className={`main min-h-screen ${mode === "light" ? "bg-white" : "bg-[#000000]"}`}>
//             <div className='w-full md:w-4/5 lg:w-2/3 mx-auto'>
//                 <div className={`text-center text-2xl font-bold pt-9 ${mode === "light" ? "text-black" : "text-white"}`}>
//                     Your Notes
//                 </div>

//                 {message !== "" ? (<div className='text-center text-[#ff1e1e] font-semibold text-xl  my-3'>{message}</div>
//                 ) : (<div className={`text-center text-xs my-2 ${mode !== "light" ? "text-gray-400" : "text-gray-700"} `}>
//               Hover over a note block to edit or delete it.
//               </div>
//               )}

//                 {notes.length === 0 ? (
//                     <div className={`text-center text-sm  pt-9 ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
//                         No Notes
//                     </div>
//                 ) : ""}

//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 p-8  '>
//                     {notes.map(note => (
//                         <div key={note.id} className={` ${mode === "light" ? "note" : "notedark"} rounded-xl relative p-2 max-w-[400px] mx-auto overflow-auto`} >
//                             <div className='flex flex-col' onClick={() => handleShow(note.title, note.description)}>
//                                 <div className='text-xl font-semibold text-center'>
//                                     {note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
//                                 </div>
//                                 <div className='text-xs px-4 py-4 text-center'>
//                                     {note.description.length > 100 ? note.description.slice(0, 100) + "..." : note.description}
//                                 </div>
//                             </div>


//                             <div className='absolute top-0 text-2xl right-0 flex flex-col  bg-[#ff8102]  '>
//                                 <div className='p-2  bg-red-600'>

//                                     <MdDelete
//                                         className=' text-gray-300   cursor-pointer '
//                                         style={{ transition: "1s all ease" }}
//                                         onClick={() => deleteNote(note._id)}
//                                     />
//                                 </div>
//                                 <div className='p-2  bg-blue-600'>
//                                     <MdEdit className=' text-gray-300   cursor-pointer '
//                                         style={{ transition: "1s all ease" }}
//                                         onClick={() => handleupdateNote(note._id, note.title, note.description)} />
//                                 </div>
//                             </div>

//                         </div>
//                     ))}

//                 </div>

//                 <div className={`fixed w-[40px] h-[40px] border-2  rounded-full right-14 bottom-14 lg:right-[100px] lg:bottom-[100px] flex items-center justify-center cursor-pointer ${mode !== "light" ? "bg-white" : "bg-black"}`} onClick={openModal}>
//                     <FaPlus className={`text-xl ${mode === "light" ? "text-white" : "text-black"}`} />
//                 </div>
//                 <div>
//                     <Modal
//                         isOpen={modalIsOpen}
//                         z onRequestClose={closeModal}
//                         style={customStyles}
//                         contentLabel="Add Note Modal"
//                     >
//                         <h2 className='text-xl font-semibold text-center my-5'>Add Task</h2>
//                         <form onSubmit={addNote}>
//                             <div className='w-full my-4'>
//                                 <input type="text" className='w-full border-b p-2 text-sm border-black outline-none' placeholder="Enter notes title..." value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
//                             </div>
//                             <div className='w-full my-5'>
//                                 <textarea placeholder="Enter notes description..." className='w-full text-sm p-2 border-0 border-b resize-none  h-[70px] border-black outline-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
//                             </div>
//                             <div className='my-5'>
//                                 <button type="submit" className='w-full btn bg-[#ff9719]  p-2 rounded'>Add </button>
//                             </div>
//                         </form>
//                     </Modal>
//                 </div>
//             </div>

//             {openEdit && <div className='absolute top-0 h-screen w-full  flex justify-center items-center bg-black bg-opacity-90'>
//                 <div className='max-w-[600px] w-3/4  bg-white p-7 rounded-xl border-2 border-black'>
//                     <div>
//                         <MdClose className='text-2xl cursor-pointer' onClick={() => setopenEdit(false)} />
//                     </div>
//                     <h1 className='text-xl font-semibold text-center mb-5'>Update Notes</h1>

//                     <div className=' mx-auto '>
//                         <input type="text" className='w-full p-2 border-b border-black outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
//                     </div>
//                     <div className=' mx-auto'>
//                         <textarea className='w-full p-2 border mt-3 border-black outline-none resize-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
//                     </div>

//                     <div className='mx-auto my-4'>
//                         <button className='w-full border p-2 text-sm rounded hover:rounded-xl font-semibold  border-black outline-none' onClick={() => updateNote(id)} >Update</button>
//                     </div>

//                 </div>
//             </div>}
//             {show && <div className={`fixed top-0 h-screen w-full  flex justify-center items-center bg-opacity-90 ${mode === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
//                 <div className='max-w-[600px] w-full overflow-auto h-screen p-7 '>
//                     <MdClose className='text-2xl cursor-pointer' onClick={() => setshow(false)} />
//                     <h1 className='text-2xl text-center font-semibold'>Notes</h1>
//                     <div className='mt-3'>
//                         <h1 className='text-xl'>Title</h1>
//                         <p className='text-sm'>{stitle}</p>
//                     </div>
//                     <div className='mt-3'>
//                         <h1 className='text-xl'>Description</h1>
//                         <p className='text-sm'>{sdescription}</p>
//                     </div>
//                 </div>
//             </div>
//             }
//         </div>
//     );
// };

// export default Notes;


import React, { useState, useEffect } from 'react';
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "90%",
        border: "1px solid black",
        transform: 'translate(-50%, -50%)',
        maxWidth: "600px",
    },
};

const Notes = ({ mode }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [id, setId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [sTitle, setSTitle] = useState("");
    const [sDescription, setSDescription] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch('https://inotebook-api-cyan.vercel.app/api/notes/fetchallnotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addNote = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://inotebook-api-cyan.vercel.app/api/notes/addnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }),
            });
            const newNote = await response.json();
            setNotes([...notes, newNote]);
            setMessage("Note added successfully.");
            setTimeout(() => setMessage(""), 1500);
            setTitle("");
            setDescription("");
            closeModal();
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };

    const deleteNote = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) return;

        try {
            await fetch(`https://inotebook-api-cyan.vercel.app/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
            });
            setNotes(notes.filter((note) => note._id !== id));
            setMessage("Note deleted successfully.");
            setTimeout(() => setMessage(""), 1500);
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    };

    const updateNote = async () => {
        try {
            await fetch(`https://inotebook-api-cyan.vercel.app/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }),
            });
            const updatedNotes = notes.map((note) =>
                note._id === id ? { ...note, title, description } : note
            );
            setNotes(updatedNotes);
            setMessage("Note updated successfully.");
            setTimeout(() => setMessage(""), 1500);
            setOpenEdit(false);
        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    const handleEdit = (id, title, description) => {
        setId(id);
        setTitle(title);
        setDescription(description);
        setOpenEdit(true);
    };

    const handleShow = (title, description) => {
        setSTitle(title);
        setSDescription(description);
        setShow(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${mode === "light" ? "bg-white text-black" : "bg-black text-white"} min-h-screen`}>
            <div className='w-full md:w-4/5 lg:w-2/3 mx-auto p-5'>
                <h1 className='text-3xl font-bold text-center mt-6 mb-2'>Your Notes</h1>

                {message && <div className='text-center text-green-500 font-semibold my-2'>{message}</div>}
                {!message && <p className='text-center text-sm text-gray-500 mb-4'>Click on a note to view. Hover to edit or delete.</p>}

                {notes.length === 0 ? (
                    <div className='text-center mt-10 text-gray-400'>No notes to display</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6'>
                        {notes.map((note, index) => (
                            <div
                                key={note._id}
                                className={`relative border rounded-lg shadow-md p-5 transition duration-300 hover:shadow-lg cursor-pointer
                                ${mode === "light" ? "bg-white text-black border-gray-300" : "bg-[#1a1a1a] text-white border-gray-700"}`}
                            >
                                <div onClick={() => handleShow(note.title, note.description)}>
                                    <h2 className='text-xl font-bold mb-2'>{note.title}</h2>
                                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                                        {note.description.length > 300 ? note.description.slice(0, 300) + "..." : note.description}
                                    </p>
                                </div>

                                <div className='absolute top-2 right-2 flex space-x-2'>
                                    <MdEdit className='text-xl text-blue-500 hover:text-blue-700' onClick={() => handleEdit(note._id, note.title, note.description)} />
                                    <MdDelete className='text-xl text-red-500 hover:text-red-700' onClick={() => deleteNote(note._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div
                    onClick={() => setIsOpen(true)}
                    className={`fixed w-[45px] h-[45px] flex items-center justify-center right-10 bottom-10 rounded-full shadow-lg
                    ${mode === "light" ? "bg-black text-white" : "bg-white text-black"}`}
                >
                    <FaPlus className='text-xl' />
                </div>

                {/* Add Note Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add Note"
                >
                    <h2 className='text-xl font-bold text-center mb-4'>Add Note</h2>
                    <form onSubmit={addNote}>
                        <input
                            type="text"
                            className='w-full border-b border-gray-500 p-2 mb-4 outline-none'
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required minLength={3}
                        />
                        <textarea
                            className='w-full border-b border-gray-500 p-2 mb-4 outline-none h-[80px]'
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required minLength={5}
                        ></textarea>
                        <button type="submit" className='w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition'>
                            Add Note
                        </button>
                    </form>
                </Modal>

                {/* Update Note Modal */}
                {openEdit && (
                    <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
                        <div className='bg-white text-black rounded-lg p-6 w-full max-w-md'>
                            <MdClose className='text-2xl cursor-pointer float-right' onClick={() => setOpenEdit(false)} />
                            <h2 className='text-xl font-semibold mb-4 text-center'>Update Note</h2>
                            <input
                                type="text"
                                className='w-full border-b p-2 mb-4 outline-none'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required minLength={3}
                            />
                            <textarea
                                className='w-full border p-2 mb-4 outline-none h-[100px] resize-none'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required minLength={5}
                            ></textarea>
                            <button
                                className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
                                onClick={updateNote}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                )}

                {/* Note Preview Modal */}
                {show && (
                    <div className={`fixed inset-0 flex justify-center z-40 ${mode === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                        <div className='w-full max-w-xl p-6 overflow-auto max-h-screen'>
                            <MdClose className='text-2xl cursor-pointer mb-4' onClick={() => setShow(false)} />
                            <h2 className='text-xl font-bold mb-2'>Title:</h2>
                            <p className='mb-4'>{sTitle}</p>
                            <h2 className='text-xl font-bold mb-2'>Description:</h2>
                            <p className='whitespace-pre-wrap'>{sDescription}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;
