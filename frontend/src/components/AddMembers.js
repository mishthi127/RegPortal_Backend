import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../assets/bg_add.svg';
import namesbg from '../assets/names_team.svg';
import profilepic from "../assets/profilepic.svg";
import removeoutline from "../assets/removeoutline.svg";
import searchbar from "../assets/searchbar.svg";
import searchbutton from "../assets/searchbutton.svg";
import addbg from "../assets/addbg.svg";
import addbutton from "../assets/addbutton.svg";
import close from "../assets/close.svg";
import addmembtn from "../assets/addmembtn.png";
import inputbg from "../assets/inputbg.svg";
import discard from "../assets/discard.svg";


export function AddMembers(){
    const navigate = useNavigate();
    const [members, setMembers] = useState([
        { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:"" }
    ]);
    const [showAlert, setShowAlert] = useState(false);
    const [names, setNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');
    const [text, setText] = useState("");
    const [addpop, setAddpop] = useState(false);

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

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (!token) {
        setMessage('You are not logged in.');
        return;
        }

        axios
        .get(`http://localhost:8000/profile/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProfile(res.data))
        .catch(() => setMessage('Failed to load profile.'));
    }, []);


    //console.log(profile);

    // Add new member
    const addDiv = () => {
        setMembers([
            ...members,
            { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:"" }
        ]);
    };

    // Remove member
    const removeDiv = (id, tempId) => {
        if (members.length === 1) {
            alert("At least one member form is required.");
            return;
        }

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
        const token = localStorage.getItem("access");
        if (id) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/Participantdata/Participant/${id}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include token here
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to delete from backend");
                }
            } catch (err) {
                console.error(err);
                return; // Stop if backend delete failed
            }
        }

        
        const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include token here too
            },
        });
        const data = await response.json();

        const names = data.map((item) => ({
            id: item.id,
            tempId: item.tempId,
            name: item.name,
            email: item.email
        }));
        setNames(names);

        // Update filteredNames as well based on current search text
        const updatedFilteredNames = text
            ? names.filter(n => n?.name?.toLowerCase().includes(text.toLowerCase()))
            : names;

        setFilteredNames(updatedFilteredNames);
    }

    // Handle field change (works for new and saved members)
    const handleChange = (id, tempId, field, value) => {
        setMembers(members.map(m =>
            (id ? m.id === id : m.tempId === tempId)
                ? { ...m, [field]: value }
                : m
        ));
    };

    const makediscard = () => {
        setMembers([
            { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:"" }
        ]);
    }

    // Submit to backend
    const submit = async () => {
        // Check if any field is empty
        const invalidMembers = [];
        for (let member of members) {
            // Check empty fields
            if (!member.name.trim() || !member.email.trim() || !member.phone.trim() || !member.collegename.trim() || !member.city.trim() || !member.state.trim()) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            // Check phone length
            const phoneRegex = /^[6-9]\d{9}$/;  // Indian numbers start 6-9 and are 10 digits
            if (!phoneRegex.test(member.phone)) {
                invalidMembers.push(`${member.name} (Invalid phone number: ${member.phone})`);
            }


            // Check that name, city, college contain only letters
            const lettersRegex = /^[A-Za-z\s]+$/; // letters and spaces only
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!lettersRegex.test(member.name)) {
                invalidMembers.push(`${member.name} (Invalid name)`);
            }
            if (!lettersRegex.test(member.city)) {
                invalidMembers.push(`${member.name} (Invalid city)`);
            }
            if (!lettersRegex.test(member.collegename)) {
                invalidMembers.push(`${member.name} (Invalid college name)`);
            }
            if (!emailRegex.test(member.email)) {
            invalidMembers.push(`${member.name} (Invalid email)`);
        }
        }

        if (invalidMembers.length > 0) {
            alert("Please fix the following:\n" + invalidMembers.join("\n"));
            //setShowAlert(true);
            return;
        }

        try {
            await Promise.all(
                members.map(async (member) => {
                    const token = localStorage.getItem('access');
                    const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/", {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                        //headers: { "Content-Type": "application/json" },
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

            //alert("All members saved successfully!");
            setMembers([
                { id: null, tempId: crypto.randomUUID(), name: "", email: "", gender: "Male", phone: "", collegename:"", city:"", state:""  }
            ]);
        } catch (err) {
            console.error(err);
        }

        displayNames();
        setAddpop(false);        
    };

    const displayNames = async() => {
        // const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/");

        const token = localStorage.getItem("access");
        const response = await fetch("http://127.0.0.1:8000/Participantdata/Participant/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });


        const data = await response.json();
        console.log(data);

        const names = data.map((item) => ({
            id: item.id,
            tempId: item.tempId,
            name: item.name,
            email: item.email,
        }));
        console.log(names);
        setNames(names);
    }

    useEffect(()=>{displayNames()},[]);

    const searchNames = () => {
        console.log("search text:", text);

        // filter safely using optional chaining
        const results = names.filter(
        (n) =>
            n?.name &&
            n.name.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredNames(results);
        console.log("results:", results);
    };

    useEffect(() => {
        if (text !== "") {
        searchNames();
        } else {
        setFilteredNames(names); // show all if text is empty
        }
    }, [text]);

    const namesToDisplay = text ? filteredNames : names; //which array to display

    const headerBgStyle = {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const searchBgStyle = {
            backgroundImage: `url(${searchbar})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const namesBgStyle = {
            backgroundImage: `url(${namesbg})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const addBgStyle = {
            backgroundImage: `url(${addbg})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const addmemBgStyle = {
            backgroundImage: `url(${addmembtn})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const discardBgStyle = {
            backgroundImage: `url(${discard})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'cover',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    };

    const inputbgstyle = {
            backgroundImage: `url(${inputbg})`,
            backgroundPosition: 'center', // centers the image
            backgroundSize: 'contain',      // makes it cover the div
            backgroundRepeat: 'no-repeat' // prevents tiling
    }

    const noscroolbar = {
        /* Hide scrollbar for Firefox + Edge */
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    }



    useEffect(() => {
        if (addpop) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [addpop]);



    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
                {showAlert && (
                    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
                        <p className="text-lg font-semibold">This is a custom alert!</p>
                        <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setShowAlert(false)}
                        >
                        OK
                        </button>
                    </div>
                    </div>
                )}

            {/* for pop up */}
            {addpop && 
                <div className='fixed inset-0 bg-black/60 z-50 flex items-center flex-col justify-center' onClick={() => setAddpop(false)}>
                    <div className='h-[81px] w-[800px] flex flex-col justify-center items-center bg-slate-600 ' onClick={(e) => e.stopPropagation()}>
                        
                            {/* <div className='h-[27px] w-[27px] absolute top-0 left-0 bg-black'></div>
                            <div className='h-[27px] w-[27px] absolute top-0 right-0 bg-black'></div> */}
                        
                        <div className='w-[733px] h-[33px] flex justify-between items-center'>
                            <p className='font-sans text-2xl font-semibold text-alch-cream'>Add Team Member</p>
                            <button onClick={()=>{setAddpop(false)}}><img src={close} alt='close' className='h-[32px] w-[32px]' /></button>
                        </div>
                    </div>
                    <div className='h-[100vh] w-[800px] flex flex-col overflow-y-auto bg-alch-cream' style={noscroolbar} onClick={(e) => e.stopPropagation()}>
                            <div 
                                className='flex flex-col'
                            >
                                <div className='verticalForm'>
                                    {members.map((item, index) => (
                                        <div className='flex flex-col items-center my-[30px]' key={item.tempId} >
                                            <div className='flex flex-row justify-between items-center w-[635px]'>
                                                <p className='font-sans text-[18px] leading-[140%] tracking-[2%]'>Member {index + 1}</p>
                                                <button onClick={() => removeDiv(item.id, item.tempId)} className='removeParticipantForm'><img src={close} alt='close' className='h-[32px] w-[32px]' /></button>
                                            </div>
                                            <ul className='font-sans text-[16px] leading-[140%] tracking-[2%]'>
                                                <li className='h-[84px] mt-[24px]'>
                                                    <label className='h-[25px] font-sans text-[18px] leading-[140%] tracking-[2%]'>Full Name</label><br/>
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "name", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    />
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>Email*</label><br/>
                                                    <input
                                                        type="email"
                                                        value={item.email}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "email", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    />
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>Gender*</label><br/>
                                                    <select
                                                        value={item.gender}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "gender", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    >
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>Phone Number*</label><br/>
                                                    <input
                                                        type="number"
                                                        value={item.phone}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "phone", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    />
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>College Name*</label><br/>
                                                    <input
                                                        type="text"
                                                        value={item.collegename}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "collegename", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    />
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>City Name*</label><br/>
                                                    <input
                                                        type="text"
                                                        value={item.city}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "city", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px] text-[14px] bg-transparent'
                                                    />
                                                </li>
                                                <li className='mt-[24px]'>
                                                    <label>State*</label><br/>
                                                    <select
                                                        value={item.state}
                                                        onChange={(e) => handleChange(item.id, item.tempId, "state", e.target.value)}
                                                        style={inputbgstyle}
                                                        className='w-[557.25px] h-[45px] mt-[11px] outline-none px-[15px]  text-[14px] bg-transparent'
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
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div>
                    <div className='h-[81px] w-[800px] flex justify-center items-center relative bg-alch-cream border-t-[1px] border-alch-dark' onClick={(e) => e.stopPropagation()}>
                                {/* <div className='h-[27px] w-[27px] absolute bottom-0 left-0 bg-black'></div>
                                <div className='h-[27px] w-[27px] absolute bottom-0 right-0 bg-black'></div> */}
                        <div className='flex justify-between items-center w-[800px]'>
                            <button className=' h-[35px] w-[157px] ml-[31.73px]' onClick={addDiv} style={addmemBgStyle}><p className='font-sans text-[16px] font-bold text-alch-dark'>Add Form</p></button> 
                            <div className='flex flex-row gap-[31.73px] mr-[30px]'>
                                <button className='w-[109.27px] h-[34.62px]' onClick={makediscard} style={discardBgStyle}><p className='font-sans text-[16px] font-bold text-alch-red'>Discard</p></button> 
                                <button className='w-[157px] h-[35px] ' onClick={submit} style={addmemBgStyle}><p className='font-sans text-[16px] font-bold text-alch-dark'>Add Member</p></button> 
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div 
                className='h-[766px] w-[1298px] flex items-center justify-center flex-col'
                style={headerBgStyle}>
                    <div>
                        <div
                            style={searchBgStyle}
                            className='h-[43px] w-[526px] flex items-center mb-[32px]'
                        >
                            <button><img src={searchbutton} alt='search' className='ml-[16px]'/></button>
                            <input 
                                placeholder='Search' 
                                className='bg-transparent ml-[10px] font-sans font-semibold text-base leading-none tracking-normal outline-none flex-grow'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className='w-[1079px] h-auto flex justify-center items-center flex-row gap-[27px]'>
                        <div className='h-[600px] w-[600px] flex flex-col gap-[16px]'>
                            {/* Leader Div - hide when searching */}
                            {!text && (
                                <div
                                    className='w-[526px] h-[58.08px] flex justify-center items-center cursor-pointer'
                                    style={namesBgStyle}
                                    onClick={() => navigate('/profile')}
                                >   
                                    <div className='w-[493.99px] h-[38px] flex justify-between items-center'>
                                        <div className='flex justify-between items-center gap-[17px]'>
                                            <img src={profilepic} alt='profile' className='w-[32.11px] h-[32.11px]'/>
                                            <div className='h-[38px] flex flex-col justify-between'>
                                                <p className='font-sans font-semibold text-[16px] leading-[100%] tracking-[0px]'>
                                                    {profile ? profile.fullname.toUpperCase() : "Loading..."}
                                                </p>
                                                <p className='font-sans font-normal text-[12px] leading-[100%] tracking-[0px]' >
                                                    {profile ? profile.email : "loading..."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='p-[5px] rounded-[2.5px] bg-alch-red text-alch-cream text-center font-sans font-semibold text-[16px] leading-[100%] tracking-[0px]'>Leader</div>
                                    </div> 
                                </div>
                            )}

                            { namesToDisplay && 
                                namesToDisplay
                                .filter((_, index) => index % 2 === 0)
                                .map((item) => (
                                    <div className='w-[526px] h-[58.08px]  flex justify-center items-center' style={namesBgStyle} key={item.id}>
                                        <div className='w-[493.99px] h-[38px] flex justify-between items-center'>
                                            <div className='h-[38px] flex justify-center items-center gap-[17px] '>
                                                <img src={profilepic} alt='profile' className='w-[32.11px] h-[32.11px]'/>
                                                <div className='flex flex-col justify-between h-[38px]'>
                                                    <p className='font-sans font-semibold text-[16px] leading-[100%] tracking-[0px]'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                                                    <p className='font-sans font-normal text-[12px] leading-[100%] tracking-[0px]' >{item.email}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => removemember(item.id, item.tempId)} ><img src={removeoutline} alt='remove'/></button>
                                        </div>     
                                    </div>
                                ))
                            }
                            <div onClick={()=>{setAddpop(true)}} className='w-[526px] h-[58.08px]  flex justify-center items-center cursor-pointer' style={addBgStyle}>
                                <div className='flex justify-between items-center w-[493.99px] h-[33.94px]'>
                                    <p className='font-sans font-bold text-base' >Add more Members</p>
                                    <button><img src={addbutton} alt='add' className='w-[24px] h-[24px]'/></button>
                                </div>
                            </div>
                        </div>
                        <div className='h-[600px] w-[600px] flex flex-col gap-[16px]'>
                            {/* <div className='w-[526px] h-[58.08px]'></div> */}
                            { namesToDisplay && 
                                namesToDisplay
                                .filter((_, index) => index % 2 === 1)
                                .map((item) => (
                                    <div className='w-[526px] h-[58.08px] flex justify-center items-center' style={namesBgStyle} key={item.id}>
                                        <div className='w-[493.99px] h-[38px] flex justify-between items-center'>
                                            <div className='h-[38px] flex justify-center items-center gap-[17px] '>
                                                <img src={profilepic} alt='profile' className='w-[32.11px] h-[32.11px]'/>
                                                <div className='flex flex-col justify-between h-[38px]'>
                                                    <p className='font-sans font-semibold text-[16px] leading-[100%] tracking-[0px]'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                                                    <p className='font-sans font-normal text-[12px] leading-[100%] tracking-[0px]' >{item.email}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => removemember(item.id, item.tempId)} ><img src={removeoutline} alt='remove'/></button>
                                        </div>     
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}