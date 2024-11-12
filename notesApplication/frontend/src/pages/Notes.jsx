import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';




function Notes() {
    const [notes, setNotes] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newStatus, setNewStatus] = useState(false); // State for the new note's status
    const [editingNote, setEditingNote] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    const [editedStatus, setEditedStatus] = useState(false); // State for edited note's status
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // const [newImageUrl, setNewImageUrl] = useState(""); // New state for image URL
    const notesPerPage = 3;
    const navigate = useNavigate();

    const fetchNotes = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://fullstacknotesapplication01.onrender.com/notes/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setNotes(data.data);
        } catch (error) {
            alert("Error fetching notes:", error.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleCreateNote = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://fullstacknotesapplication01.onrender.com/notes/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle, content: newContent, status: newStatus })
            });
            const result = await response.json();

            if (response.ok) {
                alert("Note created successfully!");
                setNewTitle("");
                setNewContent("");
                setNewStatus(false); // Reset status after creation
                // setNewImageUrl("")
                fetchNotes();
            } else {
                alert(`Failed to create note: ${result.msg}`);
            }
        } catch (error) {
            alert("Error creating note:", error.message);
        }
    };

    const handleDel = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await fetch(`https://fullstacknotesapplication01.onrender.com/notes/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchNotes();
        } catch (error) {
            alert("Error deleting note:", error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleEdit = (note) => {
        setEditingNote(note._id);
        setEditedTitle(note.title);
        setEditedContent(note.content);
        setEditedStatus(note.status); // Load the existing status of the note being edited
    };

    const saveEdit = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://fullstacknotesapplication01.onrender.com/notes/update/${editingNote}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: editedTitle, content: editedContent, status: editedStatus })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert("Note updated successfully!");
                setEditingNote(null);
                fetchNotes();
            } else {
                alert(result.msg);
            }
        } catch (error) {
            alert("Failed to update note:", error.message);
        }
    };

    // Filtered and paginated notes
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

    const startIndex = (currentPage - 1) * notesPerPage;
    const paginatedNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

    // Navigate to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Navigate to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <button style={{backgroundColor:"red"}} onClick={handleLogout}>Logout</button>




            {/* Search input */}
            <input style={{width:"250px"}}
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Note Creation Form */}
            <div>
                <h2>Create a New Note</h2>

{/*                 
            <input
                    placeholder="Image URL"
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)} style={{width:"200px"}}
                /> */}
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{width:"200px"}}
                />
                <input
                    placeholder="Content"
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)} style={{width:"200px"}}
                ></input>
                <label>
                    <input
                        type="checkbox"
                        checked={newStatus}
                        onChange={(e) => setNewStatus(e.target.checked)}
                    />
                    Completed
                </label>
                <button style={{backgroundColor:"green", color:'white'}} onClick={handleCreateNote}>Create Note</button>
            </div>

            

            {/* Notes Display */}
            {paginatedNotes.length > 0 ? paginatedNotes.map((el) => (
                <div key={el._id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
                    {editingNote === el._id ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                placeholder="Edit title"
                            />
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="Edit content"
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editedStatus}
                                    onChange={(e) => setEditedStatus(e.target.checked)}
                                />
                                Completed
                            </label>
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={() => setEditingNote(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Title:</strong> {el.title}</p>
                            <p><strong>Status:</strong> {el.status ? "Completed" : "Pending"}</p>
                            <p><strong>Content:</strong> {el.content}</p>

                            {el.imageUrl && <img src={el.imageUrl} alt="Note" style={{ maxWidth: "200px" }} />} 
                            <button style={{backgroundColor:"orange"}} onClick={() => handleDel(el._id)}>Delete</button>
                            <button style={{backgroundColor:"grey"}} onClick={() => handleEdit(el)}>Edit</button>
                        </>
                    )}
                </div>
            )) : <p>No notes found</p>}

            {/* Pagination Controls */}
            <div style={{ marginTop: "20px" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Notes;
