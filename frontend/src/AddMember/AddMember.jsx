import { useState } from 'react'
import './AddMember.css'

export function AddMemeber(){
    const [div, setDiv] = useState([{id: crypto.randomUUID()}]);
    const [name, setName] = useState(['']);

    const addDiv = () => {
        setDiv([...div, { id: crypto.randomUUID() }]);
    };


    const removeDiv = (id) => {
        setDiv(div.filter(item => item.id !== id));
    };

    const submit = () => {

    }

    return(
        <>
            <div>
                <button onClick={addDiv}>add</button>
                {
                    div.map((item, index) => {
                        return(
                            <div key={item.id}>
                                <div >member {index + 1}</div>
                                <div>
                                    <ul>
                                        <li>
                                            <label>Email</label>
                                            <input type='email' />
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input type='text' />
                                        </li>
                                        <li>
                                            <label>Gender</label>
                                            <select>
                                                <option value={"Male"}>Male</option>
                                                <option value={"Female"}>Female</option>
                                                <option value={"Rather not to say"}>Rather not to say</option>
                                                <option value={"none"}>none</option>
                                            </select>
                                        </li>
                                        <li>
                                            <label>Phone Number</label>
                                            <input type='number' />
                                        </li>
                                    </ul>
                                </div>
                                <button onClick={()=>{removeDiv(item.id, index)}}>remove</button>
                            </div>
                        )
                    })
                }
                <button onClick={submit()}>submit</button>
            </div>
        </>
    )
}