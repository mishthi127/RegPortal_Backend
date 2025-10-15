import { useState } from "react"

export function FAQS(){
    const [openindex, setOpenindex] = useState(null);
    const invert = (index) => {
        if(openindex === index){
            setOpenindex(null);
        }else{
            setOpenindex(index);
        }
    }

    return(
        <div 
            className="w-full h-[702px] bg-transparent flex flex-col items-center justify-center "
            
        >
            <div className="w-[970px] display-block mt-[22px] mb-[22px]">
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
                    {openindex !== 1 && <img src="/updown.png" onClick={()=>{invert(1);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    {openindex === 1 && <img src="/downup.png" onClick={()=>{invert(1);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                </div>
                {   openindex === 1 &&
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
            <div className="w-[970px] display-block mt-[22px] mb-[22px]">
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
                    {openindex !== 2 && <img src="/updown.png" onClick={()=>{invert(2);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    {openindex === 2 && <img src="/downup.png" onClick={()=>{invert(2);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                </div>
                {   openindex === 2 &&
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
            <div className="w-[970px] display-block mt-[22px] mb-[22px]">
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
                    {openindex !== 3 && <img src="/updown.png" onClick={()=>{invert(3);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    {openindex === 3 && <img src="/downup.png" onClick={()=>{invert(3);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                </div>
                {   openindex === 3 &&
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
            <div className="w-[970px] display-block mt-[22px] mb-[22px]">
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
                    {openindex !== 4 && <img src="/updown.png" onClick={()=>{invert(4);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    {openindex === 4 && <img src="/downup.png" onClick={()=>{invert(4);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                </div>
                {   openindex === 4 &&
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
            <div className="w-[970px] display-block mt-[22px] mb-[22px]">
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
                    {openindex !== 5 && <img src="/updown.png" onClick={()=>{invert(5);}} alt="updown" className="w-[16px] h-[15px] mr-[20px]"/>}
                    {openindex === 5 && <img src="/downup.png" onClick={()=>{invert(5);}} alt="downup" className="w-[16px] h-[15px] mr-[20px]"/>}
                </div>
                {   openindex === 5 &&
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
    )
}