import { useState } from 'react';
import './AddMember.css';

export function AddMember() {
    const [members, setMembers] = useState([
        { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "" }
    ]);

    const [names, setNames] = useState([]);

    // Add new member
    const addDiv = () => {
        setMembers([
            ...members,
            { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "" }
        ]);
    };

    // Remove member
    const removeDiv = (id, tempId) => {
        setMembers(members.filter(item => item.id !== id));
    };

    const removemember = async(id, tempId) => {
        if (id) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/Participantdata/Participant/${id}/`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Failed to delete from backend");
                }
            } catch (err) {
                console.error(err);
                return; // Stop if backend delete failed
            }
        }

        const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/");
        const data = await response.json();

        const names = data.map((item) => ({
            id: item.id,
            tempId: item.tempId,
            name: item.name
        }));
        setNames(names);
    }

    // Handle field change (works for new and saved members)
    const handleChange = (id, tempId, field, value) => {
        setMembers(members.map(m =>
            (id ? m.id === id : m.tempId === tempId)
                ? { ...m, [field]: value }
                : m
        ));
    };

    // Submit to backend
    const submit = async () => {
        try {
            await Promise.all(
                members.map(async (member) => {
                    const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: member.name,
                            email: member.email,
                            gender: member.gender,
                            phone: member.phone
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to save member: ${member.name}`);
                    }
                })
            );

            alert("All members saved successfully!");
            setMembers([
                { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "" }
            ]);
        } catch (err) {
            console.error(err);
        }

        const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/");
        const data = await response.json();

        const names = data.map((item) => ({
            id: item.id,
            tempId: item.tempId,
            name: item.name
        }));
        setNames(names);
    };


    return (
        <div>
            <button onClick={addDiv}>Add</button>
            {members.map((item, index) => (
                <div key={item.tempId} >
                    <div>Member {index + 1}</div>
                    <ul>
                        <li>
                            <label>Name</label>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleChange(item.id, item.tempId, "name", e.target.value)}
                                
                            />
                        </li>
                        <li>
                            <label>Email</label>
                            <input
                                type="email"
                                value={item.email}
                                onChange={(e) => handleChange(item.id, item.tempId, "email", e.target.value)}
                                
                            />
                        </li>
                        <li>
                            <label>Gender</label>
                            <select
                                value={item.gender}
                                onChange={(e) => handleChange(item.id, item.tempId, "gender", e.target.value)}
                                
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </li>
                        <li>
                            <label>Phone Number</label>
                            <input
                                type="number"
                                value={item.phone}
                                onChange={(e) => handleChange(item.id, item.tempId, "phone", e.target.value)}
                                
                            />
                        </li>
                    </ul>
                    <button onClick={() => removeDiv(item.id, item.tempId)}>Remove</button>
                </div>
            ))}
            <button onClick={submit}>Submit</button>

            <div>
                { names && 
                    names.map((item) => (
                        <div key={item.tempId}>
                            <p>{item.name}</p>
                            <button onClick={() => removemember(item.id, item.tempId)}>r</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
