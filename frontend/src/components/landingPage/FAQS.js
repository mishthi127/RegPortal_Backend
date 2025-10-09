import { useState } from "react"
import flower from "../../assets/heading-icon-red.svg"
import faqblackbar from "../../assets/faqblackbar.svg"

export function FAQS(){
    const [openindex, setOpenindex] = useState([]);
    const invert = (index) => {
        if (openindex.includes(index)) {
            setOpenindex(openindex.filter(i => i !== index));
        } else {
            setOpenindex([...openindex, index]);
        }
    }


    return(
        <div className="h-[702px] w-full  flex flex-col">
            <div className=" flex justify-center items-center mt-[60px] gap-[10px]  text-center font-modernoir text-4xl sm:text-5xl font-extrabold text-alch-dark">
                
                    <img src={flower} alt="red"/>
                    FAQS
                    <img src={flower} alt="red"/>
            </div>
            <div 
                className="  bg-transparent flex flex-col flex-1 items-center mt-[100px]  overflow-y-auto hide-scrollbar"
            >   
                <div className="w-[970px] display-block ">
                    <div 
                        className="w-full h-[60px] flex justify-between items-center"
                        style={{
                            backgroundImage: "url('/faqbar.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}    
                    >
                        <p className="text-[rgba(238,236,217,1)] ml-[15px] font-bold text-sm tracking-[0.04em] leading-[110.00000000000001%]">IS THERE ACCOMMODATION PROVIDED FOR OUTSTATION PARTICIPANTS AT ALCHERINGA?</p>
                        {!openindex.includes(1) && <img src="/downup.png" onClick={()=>{invert(1);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                        {openindex.includes(1) && <img src="/updown.png" onClick={()=>{invert(1);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    </div>
                    {   openindex.includes(1) &&
                        <div
                            style={{
                                backgroundImage: "url('/popfaqbar.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }} 
                            className="h-[99px] flex justify-center items-center -mt-[12px]"
                        >
                            <p className="font-normal text-sm tracking-[0.02em] leading-[140%] h-[60px] w-[899px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was </p>
                        </div>
                    }
                </div>
                <div className="w-[970px] display-block  mt-[44px]  ">
                    <div 
                        className="w-full h-[60px] flex justify-between items-center"
                        style={{
                            backgroundImage: "url('/faqbar.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}    
                    >
                        <p className="text-[rgba(238,236,217,1)] ml-[15px] font-bold text-sm tracking-[0.04em] leading-[110.00000000000001%]">IS THERE ACCOMMODATION PROVIDED FOR OUTSTATION PARTICIPANTS AT ALCHERINGA?</p>
                        {!openindex.includes(2) && <img src="/downup.png" onClick={()=>{invert(2);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                        {openindex.includes(2) && <img src="/updown.png" onClick={()=>{invert(2);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    </div>
                    {   openindex.includes(2) &&
                        <div
                            style={{
                                backgroundImage: "url('/popfaqbar.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }} 
                            className="h-[99px] flex justify-center items-center -mt-[12px]"
                        >
                            <p className="font-normal text-sm tracking-[0.02em] leading-[140%] h-[60px] w-[899px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was </p>
                        </div>
                    }
                </div>
                <div className="w-[970px] display-block  mt-[44px]  ">
                    <div 
                        className="w-full h-[60px] flex justify-between items-center"
                        style={{
                            backgroundImage: "url('/faqbar.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}    
                    >
                        <p className="text-[rgba(238,236,217,1)] ml-[15px] font-bold text-sm tracking-[0.04em] leading-[110.00000000000001%]">IS THERE ACCOMMODATION PROVIDED FOR OUTSTATION PARTICIPANTS AT ALCHERINGA?</p>
                        {!openindex.includes(3) && <img src="/downup.png" onClick={()=>{invert(3);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                        {openindex.includes(3) && <img src="/updown.png" onClick={()=>{invert(3);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    </div>
                    {   openindex.includes(3) &&
                        <div
                            style={{
                                backgroundImage: "url('/popfaqbar.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }} 
                            className="h-[99px] flex justify-center items-center -mt-[12px]"
                        >
                            <p className="font-normal text-sm tracking-[0.02em] leading-[140%] h-[60px] w-[899px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was </p>
                        </div>
                    }
                </div>
                <div className="w-[970px] display-block  mt-[44px]  ">
                    <div 
                        className="w-full h-[60px] flex justify-between items-center"
                        style={{
                            backgroundImage: "url('/faqbar.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}    
                    >
                        <p className="text-[rgba(238,236,217,1)] ml-[15px] font-bold text-sm tracking-[0.04em] leading-[110.00000000000001%]">IS THERE ACCOMMODATION PROVIDED FOR OUTSTATION PARTICIPANTS AT ALCHERINGA?</p>
                        {!openindex.includes(4) && <img src="/downup.png" onClick={()=>{invert(4);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                        {openindex.includes(4) && <img src="/updown.png" onClick={()=>{invert(4);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    </div>
                    {   openindex.includes(4) &&
                        <div
                            style={{
                                backgroundImage: "url('/popfaqbar.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }} 
                            className="h-[99px] flex justify-center items-center -mt-[12px]"
                        >
                            <p className="font-normal text-sm tracking-[0.02em] leading-[140%] h-[60px] w-[899px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was </p>
                        </div>
                    }
                </div>
                <div className="w-[970px] display-block  mt-[44px]  ">
                    <div 
                        className="w-full h-[60px] flex justify-between items-center"
                        style={{
                            backgroundImage: "url('/faqbar.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}    
                    >
                        <p className="text-[rgba(238,236,217,1)] ml-[15px] font-bold text-sm tracking-[0.04em] leading-[110.00000000000001%]">IS THERE ACCOMMODATION PROVIDED FOR OUTSTATION PARTICIPANTS AT ALCHERINGA?</p>
                        {!openindex.includes(5) && <img src="/downup.png" onClick={()=>{invert(5);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                        {openindex.includes(5) && <img src="/updown.png" onClick={()=>{invert(5);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    </div>
                    {   openindex.includes(5) &&
                        <div
                            style={{
                                backgroundImage: "url('/popfaqbar.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }} 
                            className="h-[99px] flex justify-center items-center -mt-[12px]"
                        >
                            <p className="font-normal text-sm tracking-[0.02em] leading-[140%] h-[60px] w-[899px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}