import { useEffect, useState } from 'react';
import './AddMember.css';

export function AddMember() {
    const [members, setMembers] = useState([
        { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:"" }
    ]);

    const [names, setNames] = useState([]);

    const STATES = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];


    // Add new member
    const addDiv = () => {
        setMembers([
            ...members,
            { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:"" }
        ]);
    };

    // Remove member
    const removeDiv = (id, tempId) => {
        setMembers(members.filter(item => {
            if (id) {
                return item.id !== id;
            } else {
                return item.tempId !== tempId;
            }
        }));
    };


    const removemember = async(id, tempId) => {
        console.log(id);
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
        // Check if any field is empty
        for (let member of members) {
            if (!member.name.trim() || !member.email.trim() || !member.phone.trim() || !member.collegename.trim() || !member.city.trim() || !member.state.trim()) {
                alert("Please fill in all fields before submitting.");
                return; // Stop execution
            }
        }

        try {
            await Promise.all(
                members.map(async (member) => {
                    const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: member.name,
                            email: member.email,
                            gender: member.gender === "Male" ? "M" : member.gender === "Female" ? "F" : "O",
                            phone: `+91${member.phone}`,
                            collegename: member.collegename,
                            city: member.city,
                            state: member.state,
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to save member: ${member.name}`);
                    }
                })
            );

            alert("All members saved successfully!");
            setMembers([
                { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:""  }
            ]);
        } catch (err) {
            console.error(err);
        }

        displayNames();        
    };

    const displayNames = async() => {
        const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/");
        const data = await response.json();

        const names = data.map((item) => ({
            id: item.id,
            tempId: item.tempId,
            name: item.name
        }));
        setNames(names);
    }

    useEffect(()=>{displayNames()},[]);


    return (
        <div className='page'>
            <div className='addParticipant'>
                <div className='addParticipantForms'>
                    <button className='addForm' onClick={addDiv}>Add</button>
                    <div className='verticalForm'>
                        {members.map((item, index) => (
                            <div className='form' key={item.tempId} >
                                <p>Member {index + 1}</p>
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
                                    <li>
                                        <label>College Name</label>
                                        <input
                                            type="text"
                                            value={item.collegename}
                                            onChange={(e) => handleChange(item.id, item.tempId, "collegename", e.target.value)}
                                            
                                        />
                                    </li>
                                    <li>
                                        <label>City Name</label>
                                        <input
                                            type="text"
                                            value={item.city}
                                            onChange={(e) => handleChange(item.id, item.tempId, "city", e.target.value)}
                                            
                                        />
                                    </li>
                                    <li>
                                        <label>state</label>
                                        <select
                                            value={item.state}
                                            onChange={(e) => handleChange(item.id, item.tempId, "state", e.target.value)}
                                        >
                                            <option value="">Select a State</option>
                                            {STATES.map((st) => (
                                            <option key={st} value={st}>
                                                {st}
                                            </option>
                                            ))}
                                        </select>
                                    </li>
                                </ul>
                                <button onClick={() => removeDiv(item.id, item.tempId)} className='removeParticipantForm'>Remove</button>
                            </div>
                        ))}
                    </div>
                    <button className='submitForm' onClick={submit}>Submit</button>
                </div>
                <div className='nameList'>
                    { names && 
                        names.map((item) => (
                            <div className='participantName' key={item.tempId}>
                                <p>{item.name}</p>
                                <button onClick={() => removemember(item.id, item.tempId)} className='removeParticipant'><i class="fa-solid fa-user-minus"></i></button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
